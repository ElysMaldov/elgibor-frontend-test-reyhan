import WishlistList from "@/components/ui/lists/WishlistList";
import { Button } from "@/components/ui/shadcn/button";
import NotFound from "@/components/utils/errors/NotFound";
import SomethingWentWrong from "@/components/utils/errors/SomethingWentWrong";
import FetchingProducts from "@/components/utils/loading/FetchingProducts";
import type { RootState } from "@/lib/store";
import { useListProductsQuery } from "@/lib/store/apis/fake-store";
import { selectWishlist } from "@/lib/store/reducers/wishlist/selectors";
import { HeartCrack } from "lucide-react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export interface WishlistListQueryProps {}

const WishlistListQuery = ({}: WishlistListQueryProps) => {
  const { data, error, isLoading } = useListProductsQuery();
  const { items } = useSelector((state: RootState) => selectWishlist(state));

  const wishlistedProducts = useMemo(() => {
    return data?.filter((product) =>
      items.includes(product.id.toLocaleString()),
    );
  }, [data, items]);

  if (isLoading) {
    return <FetchingProducts />;
  }

  if (error) {
    return <SomethingWentWrong error={error} />;
  }

  if (!wishlistedProducts) {
    return <NotFound />;
  }

  return (
    <section>
      <header className="mx-auto w-full max-w-2xl space-y-4 p-6">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Wishlist
        </h1>
      </header>

      {wishlistedProducts.length ? (
        <WishlistList products={wishlistedProducts} />
      ) : (
        <section className="flex flex-col items-center gap-y-1">
          <HeartCrack />
          <p className="text-center">Nothing wishlisted</p>
          <Link to="/">
            <Button>Browse Products</Button>
          </Link>
        </section>
      )}
    </section>
  );
};

export default WishlistListQuery;
