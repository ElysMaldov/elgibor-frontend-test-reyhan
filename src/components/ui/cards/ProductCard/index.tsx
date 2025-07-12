import { Badge } from "@/components/ui/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import type { RootState } from "@/lib/store";
import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

export type ProductCardProps = Pick<
  FakeStoreProduct,
  "title" | "price" | "image" | "category" | "id"
>;

const ProductCard = ({
  category,
  image,
  price,
  title,
  id,
}: ProductCardProps) => {
  const averageRating = useSelector(
    (state: RootState) =>
      state.productReviews.reviews[id]?.averageRating.toFixed(1) ?? 0,
  );

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
    </Card>
  );
};

export default ProductCard;
