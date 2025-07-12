import { Badge } from "@/components/ui/shadcn/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";

export type ProductCardProps = Pick<
  FakeStoreProduct,
  "title" | "price" | "image" | "category" | "id"
>;

const ProductCard = ({ category, image, price, title }: ProductCardProps) => {
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
        </CardDescription>

        <CardTitle className="break-all sm:break-normal">{title}</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default ProductCard;
