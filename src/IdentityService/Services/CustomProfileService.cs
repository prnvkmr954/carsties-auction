using System;
using System.Security.Claims;
using Duende.IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class CustomProfileService : IProfileService
{
    private readonly UserManager<ApplicationUser> _usermanager;

    public CustomProfileService(UserManager<ApplicationUser> usermanager)
    {
        _usermanager = usermanager;
    }
    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var user = await _usermanager.GetUserAsync(context.Subject);
        var existingClaims = await _usermanager.GetClaimsAsync(user);

        var claims = new List<Claim>
        {
            new Claim("username", user.UserName)
        };

        context.IssuedClaims.AddRange(claims);
        context.IssuedClaims.Add(existingClaims.FirstOrDefault(x => x.Type == JwtClaimTypes.Name));
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        return Task.CompletedTask;
    }
}
