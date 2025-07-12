"use client";

import { Badge } from "@/components/ui/shadcn/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/shadcn/breadcrumb";
import { Button } from "@/components/ui/shadcn/button";
import { Separator } from "@/components/ui/shadcn/separator";
import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";
import { Heart, Share2, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import ProductReviews from "./ProductReviews";

export interface ProductInformationProps {
  productData: FakeStoreProduct;
}

const ProductInformation = ({
  productData: { title, description, image, category, id, price, rating },
}: ProductInformationProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);

    if (isWishlisted) {
      toast("Product added to your wishlist");
    } else {
      toast("Product removed from your wishlist");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast("Product link copied to clipboard");
    }
  };

  const renderStars = (rating: number) => {
    return (
      <section className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
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
    <section className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-12">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={`/?categories=${category}`}>{category}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-12 grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <section className="space-y-4">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="relative aspect-square overflow-hidden object-contain"
            />
          </section>

          {/* Product Information */}
          <section className="space-y-6">
            <section>
              <Badge className="mb-2">{category}</Badge>
              <h1 className="text-3xl leading-tight font-bold">{title}</h1>
            </section>

            <section className="flex items-center gap-4">
              <section className="flex items-center gap-2">
                {renderStars(rating.rate)}
                <span className="font-semibold">{rating.rate}</span>
              </section>
              <span className="text-muted-foreground">
                ({rating.count} reviews)
              </span>
            </section>

            <section className="text-3xl font-bold text-primary">
              ${price.toFixed(2)}
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="leading-relaxed text-muted-foreground">
                {description}
              </p>
            </section>

            <Separator />

            <section className="flex gap-3">
              <Button
                onClick={handleWishlistToggle}
                variant={isWishlisted ? "default" : "outline"}
                size="lg"
                className="flex-1"
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                />
                {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </section>
          </section>
        </section>

        {/* Product Reviews Section */}
        <ProductReviews
          productId={id}
          averageRating={rating.rate}
          totalReviews={rating.count}
        />
      </section>
    </section>
  );
};

export default ProductInformation;
