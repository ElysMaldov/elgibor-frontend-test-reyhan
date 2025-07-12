import ProductReviewForm from "@/components/pages/ProductDetailsPage/ProductReviewForm";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Separator } from "@/components/ui/shadcn/separator";
import type { RootState } from "@/lib/store";
import { Star } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [showAddReview, setShowAddReview] = useState(false);
  const totalReviews = useSelector(
    (state: RootState) =>
      state.productReviews.reviews[productId]?.totalReviews ?? 0,
  );
  const averageRating = useSelector(
    (state: RootState) =>
      state.productReviews.reviews[productId]?.averageRating ?? 0,
  );
  const userReviews = useSelector(
    (state: RootState) => state.productReviews.reviews[productId]?.userReviews,
  );

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    return (
      <section className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </section>
    );
  };

  return (
    <section className="space-y-6">
      {/* Reviews Summary */}
      <section className="flex flex-col items-start gap-y-4 sm:flex-row sm:items-center sm:justify-between">
        <section>
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <section className="mt-2 flex items-center gap-2">
            {renderStars(averageRating, "md")}
            <span className="text-lg font-semibold">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-muted-foreground">
              ({totalReviews} reviews)
            </span>
          </section>
        </section>
        <Button
          onClick={() => setShowAddReview(!showAddReview)}
          variant={showAddReview ? "outline" : "default"}
          className="w-full sm:w-fit"
        >
          {showAddReview ? "Cancel" : "Write a Review"}
        </Button>
      </section>

      {/* Review Form */}
      {showAddReview && (
        <ProductReviewForm
          productId={productId}
          onReviewSubmit={() => setShowAddReview(false)}
        />
      )}

      <Separator />

      {/* Reviews List */}
      <section className="space-y-6">
        {userReviews
          ?.slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .map((review) => (
            <section
              key={review.id}
              className="space-y-3"
            >
              <section className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review.userAvatar || "/placeholder.svg"}
                    alt={review.name}
                  />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <section className="flex-1 space-y-2">
                  <section className="flex items-center gap-2">
                    <h4 className="font-semibold">{review.name}</h4>
                    <small>{review.email}</small>
                  </section>
                  <section className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </section>
                  <p className="text-sm leading-relaxed">{review.comment}</p>
                </section>
              </section>
              <Separator />
            </section>
          ))}
      </section>
    </section>
  );
}
