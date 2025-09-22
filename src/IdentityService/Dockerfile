FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY carsties-auction.sln ./
COPY src/IdentityService/IdentityService.csproj ./src/IdentityService/

RUN dotnet restore ./src/IdentityService/IdentityService.csproj

COPY . .
RUN dotnet publish ./src/IdentityService/IdentityService.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR  /app
EXPOSE 80
COPY --from=build /app/publish .
ENTRYPOINT [ "dotnet", "IdentityService.dll" ]