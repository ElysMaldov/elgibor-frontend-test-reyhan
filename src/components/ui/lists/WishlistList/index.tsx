import WishlistCard from "@/components/ui/cards/WishlistCard";
import type { FakeStoreProduct } from "@/lib/types/FakeStoreProduct";
import { Link } from "react-router";

export interface WishlistListProps {
  products: FakeStoreProduct[];
}

const WishlistList = ({ products }: WishlistListProps) => {
  const wishlistCards = products.map((product) => (
    <li key={product.id}>
      <Link to={`/product/${product.id}`}>
        <WishlistCard {...product} />
      </Link>
    </li>
  ));

  return (
    <ul
      className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4"
      data-testid="list-wishlist"
    >
      {wishlistCards}
    </ul>
  );
};

export default WishlistList;
