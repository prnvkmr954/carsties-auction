import { Auction } from "@/index";
import CarImage from "./CarImage";
import CountdownTimer from "./CountdownTimer";

type Props = {
    auction: Auction
};

export default function AuctionCard({auction}: Props) {
  return (
    <a href="" >
        <div className="relative w-full bg-gray-200 aspect-[16/10] overflow-hidden rounded-lg">
            <CarImage imageUrl={auction.imageUrl} />
            <div className="absolute bottom-2 left-2">
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
            </div>
        </div>
       
        <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm"> {auction.year}</p>

        </div>
       
    </a>
  )
}
