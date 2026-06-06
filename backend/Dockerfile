FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MyChurch.Domain/MyChurch.Domain.csproj MyChurch.Domain/
COPY MyChurch.Application/MyChurch.Application.csproj MyChurch.Application/
COPY MyChurch.Infrastructure/MyChurch.Infrastructure.csproj MyChurch.Infrastructure/
COPY MyChurch.API/MyChurch.API.csproj MyChurch.API/

RUN dotnet restore MyChurch.API/MyChurch.API.csproj

COPY . .
RUN dotnet publish MyChurch.API/MyChurch.API.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MyChurch.API.dll"]
