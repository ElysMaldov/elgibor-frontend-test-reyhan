import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Separator } from "@/components/ui/shadcn/separator";
import NoUserReviews from "@/components/utils/errors/NoUserReviews";
import type { RootState } from "@/lib/store";
import { Star } from "lucide-react";
import { useSelector } from "react-redux";

export interface ReviewsListProps {
  productId: string;
}

const ReviewsList = ({ productId }: ReviewsListProps) => {
  const reviews = useSelector(
    (state: RootState) => state.productReviews.reviews[productId]?.userReviews,
  );

  if (!reviews || !reviews.length) {
    return <NoUserReviews />;
  }

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
      {reviews
        .slice()
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
  );
};

export default ReviewsList;
