import ProductReviewForm from "@/components/pages/ProductDetailsPage/ProductReviewForm";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Separator } from "@/components/ui/shadcn/separator";
import type { UserReview } from "@/lib/types/UserReview";
import { Star } from "lucide-react";
import { useState } from "react";

interface ProductReviewsProps {
  productId: number;
  averageRating: number;
  totalReviews: number;
}

export default function ProductReviews({
  // productId,
  averageRating,
  totalReviews,
}: ProductReviewsProps) {
  const [reviews /* setReviews */] = useState<UserReview[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. Would definitely recommend to others.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment:
        "Great value for money. The product works as described, though the packaging could be improved. Overall satisfied with the purchase.",
      date: "2024-01-10",
      verified: true,
    },
    {
      id: "3",
      userId: "user3",
      userName: "Emily Rodriguez",
      rating: 5,
      comment:
        "Perfect! Exactly what I was looking for. Fast shipping and excellent customer service. Will buy again.",
      date: "2024-01-08",
      verified: false,
    },
  ]);

  const [showAddReview, setShowAddReview] = useState(false);

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
      {showAddReview && <ProductReviewForm />}

      <Separator />

      {/* Reviews List */}
      <section className="space-y-6">
        {reviews.map((review) => (
          <section
            key={review.id}
            className="space-y-3"
          >
            <section className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={review.userAvatar || "/placeholder.svg"}
                  alt={review.userName}
                />
                <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <section className="flex-1 space-y-2">
                <section className="flex items-center gap-2">
                  <h4 className="font-semibold">{review.userName}</h4>
                </section>
                <section className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-muted-foreground">
                    {review.date}
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
