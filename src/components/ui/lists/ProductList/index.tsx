import type { ProductCardProps } from "@/components/ui/cards/ProductCard";
import ProductCard from "@/components/ui/cards/ProductCard";

export interface ProductListProps {
  products: ProductCardProps[];
}

const ProductList = ({ products }: ProductListProps) => {
  const productCards = products.map((product) => (
    <li key={product.id}>
      <ProductCard {...product} />
    </li>
  ));

  return <ul className="grid grid-cols-2 gap-2.5">{productCards}</ul>;
};

export default ProductList;
