import type { ProductCardProps } from "@/components/ui/cards/ProductCard";
import ProductCard from "@/components/ui/cards/ProductCard";
import { Link } from "react-router";

export interface ProductListProps {
  products: ProductCardProps[];
}

const ProductList = ({ products }: ProductListProps) => {
  const productCards = products.map((product) => (
    <li key={product.id}>
      <Link to={`/product/${product.id}`}>
        <ProductCard {...product} />
      </Link>
    </li>
  ));

  return (
    <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4">
      {productCards}
    </ul>
  );
};

export default ProductList;
