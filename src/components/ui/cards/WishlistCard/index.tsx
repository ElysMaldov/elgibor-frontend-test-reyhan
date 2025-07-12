import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import type { RootState } from "@/lib/store";
import { removeFromWishlist } from "@/lib/store/reducers/wishlist";
import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";
import { HeartCrack, Star } from "lucide-react";
import type { MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export type WishlistCardProps = Pick<
  FakeStoreProduct,
  "title" | "price" | "image" | "category" | "id"
>;

const WishlistCard = ({
  category,
  image,
  price,
  title,
  id,
}: WishlistCardProps) => {
  const averageRating = useSelector(
    (state: RootState) =>
      state.productReviews.reviews[id]?.averageRating.toFixed(1) ?? 0,
  );
  const dispatch = useDispatch();

  const handleRemoveFromWishlist: MouseEventHandler = (e) => {
    // Prevents redirection since this button is inside an anchor
    e.stopPropagation();
    e.preventDefault();

    dispatch(removeFromWishlist(id.toLocaleString()));

    toast("Product removed from your wishlist");
  };

  const renderStars = (rating: number) => {
    return (
      <section className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`size-4 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star <= rating
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </section>
    );
  };

  return (
    <Card className="h-full">
      <CardContent>
        <img
          src={image}
          className="aspect-3/4 bg-white object-contain object-center"
        />
      </CardContent>

      <section className="flex grow flex-col justify-between gap-y-4">
        <CardHeader className="space-y-3">
          <CardDescription className="space-y-2">
            <Badge>{category}</Badge>
            <p className="text-2xl font-bold text-primary">
              ${price.toLocaleString()}
            </p>

            <section className="flex items-center gap-2">
              {renderStars(+averageRating)}
              <span className="text-xs font-semibold">{averageRating}</span>
            </section>
          </CardDescription>

          <CardTitle className="break-all sm:break-normal">{title}</CardTitle>
        </CardHeader>

        <CardFooter className="justify-end">
          <Button
            onClick={handleRemoveFromWishlist}
            variant="destructive"
          >
            <HeartCrack className={`h-5 w-5`} />
            Remove
          </Button>
        </CardFooter>
      </section>
    </Card>
  );
};

export default WishlistCard;
