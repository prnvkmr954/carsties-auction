using System;
using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _context;

    public AuctionFinishedConsumer(AuctionDbContext context)
    {
        _context = context;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
            Console.WriteLine("-----> Consuming Auction Finished");

        var auction = await _context.Auctions.FindAsync(context.Message.AuctionId);

        if (context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.Seller = context.Message.Seller;
        }

        auction.Status = auction.SoldAmount > auction.ReservedPrice ? Status.Finished : Status.ReservedNotMet;

        await _context.SaveChangesAsync();
    }
}
