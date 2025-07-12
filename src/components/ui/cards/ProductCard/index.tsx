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
      <section className="flex grow flex-col justify-between gap-y-2">
        <CardHeader>
          <CardDescription>
            <Badge>{category}</Badge>
          </CardDescription>
          <CardTitle className="break-all">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">
          ${price.toLocaleString()}
        </CardContent>
      </section>
    </Card>
  );
};

export default ProductCard;
