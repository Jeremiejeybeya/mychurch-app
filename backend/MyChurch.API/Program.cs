using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MyChurch.Application.Interfaces;
using MyChurch.Domain.Entities;
using MyChurch.Infrastructure.Data;
using MyChurch.Infrastructure.Repositories;
using MyChurch.Infrastructure.Services.Stripe;
using MyChurch.Infrastructure.Services.YouTube;
using Serilog;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();
builder.Host.UseSerilog();

// Créer le dossier data pour SQLite en production
if (builder.Environment.IsProduction())
{
    var dataDir = "/app/data";
    if (!Directory.Exists(dataDir))
        Directory.CreateDirectory(dataDir);
}

// Database SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.SignIn.RequireConfirmedEmail = false;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

// JWT
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new Exception("Jwt:Key manquant");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// CORS — accepte Vercel + localhost
var allowedOrigins = builder.Configuration["AllowedOrigins"] ?? "http://localhost:5173";
builder.Services.AddCors(options =>
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins(allowedOrigins.Split(','))
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials()));

// DI Services
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IDonationService, StripeService>();
builder.Services.AddScoped<IYouTubeService, YouTubeApiService>();

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MyChurch API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http, Scheme = "bearer", BearerFormat = "JWT"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        [new OpenApiSecurityScheme
        {
            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
        }] = Array.Empty<string>()
    });
});

var app = builder.Build();

// Swagger en dev seulement
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyChurch API v1"));
}

app.UseSerilogRequestLogging();
app.UseHttpsRedirection();
app.UseCors("ReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Migrations automatiques au démarrage
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
    Log.Information("Base de données migrée avec succès");
}

app.Run();
