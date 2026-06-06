using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyChurch.Domain.Entities;

namespace MyChurch.Infrastructure.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventRegistration> EventRegistrations => Set<EventRegistration>();
    public DbSet<Sermon> Sermons => Set<Sermon>();
    public DbSet<Donation> Donations => Set<Donation>();
    public DbSet<Department> Departments => Set<Department>();
    public DbSet<DepartmentMember> DepartmentMembers => Set<DepartmentMember>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<GalleryItem> GalleryItems => Set<GalleryItem>();
    public DbSet<DailyVerse> DailyVerses => Set<DailyVerse>();
    public DbSet<LiveStream> LiveStreams => Set<LiveStream>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // SQLite stores decimals as REAL — no HasPrecision needed

        builder.Entity<Event>()
            .HasMany(e => e.Registrations)
            .WithOne(r => r.Event)
            .HasForeignKey(r => r.EventId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Department>()
            .HasMany(d => d.Members)
            .WithOne(m => m.Department)
            .HasForeignKey(m => m.DepartmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
