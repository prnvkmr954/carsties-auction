using System;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")] 
public class SearchController : ControllerBase
{
    public async Task<ActionResult<List<Item>>> SearchItem([FromQuery]SearchParams seachParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        if (!string.IsNullOrEmpty(seachParams.SeachTerm))
        {
            query.Match(Search.Full, seachParams.SeachTerm).SortByTextScore();
        }

        query = seachParams.OrderBy switch
        {
            "make" => query.Sort(x => x.Ascending(a => a.Make)),
            "new" => query.Sort(x => x.Descending(a => a.CreatedAt)),
            _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        };

        query = seachParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if (!string.IsNullOrEmpty(seachParams.Seller))
        {
            query.Match(x=> x.Seller == seachParams.Seller);
        }

        if (!string.IsNullOrEmpty(seachParams.Winner))
        {
            query.Match(x=> x.Winner == seachParams.Winner);
        }

        query.PageNumber(seachParams.PageNumber);
        query.PageSize(seachParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            results = result.Results,
            pagecount = result.PageCount,
            totalCount = result.TotalCount

        });
    }
}
