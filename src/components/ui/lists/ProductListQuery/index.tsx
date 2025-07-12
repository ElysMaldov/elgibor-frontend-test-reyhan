import ProductSearchBar from "@/components/ui/inputs/ProductSearchBar";
import ProductList from "@/components/ui/lists/ProductList";
import { Button } from "@/components/ui/shadcn/button";
import NotFound from "@/components/utils/errors/NotFound";
import SomethingWentWrong from "@/components/utils/errors/SomethingWentWrong";
import FetchingProducts from "@/components/utils/loading/FetchingProducts";
import useProductQueryParams from "@/lib/hooks/use-product-query-params";
import { useListProductsQuery } from "@/lib/store/apis/fake-store";
import { sanitizeQueryParam } from "@/lib/utils/sanitize-query-param";
import { CircleQuestionMark } from "lucide-react";
import { useMemo } from "react";

const ProductListQuery = () => {
  const { data, error, isLoading } = useListProductsQuery();
  const { q, setQ, categories } = useProductQueryParams();
  const filteredProducts = useMemo(() => {
    const filteredByCategory = data?.filter(
      (product) => !categories?.length || categories.includes(product.category),
    );

    return filteredByCategory?.filter((product) =>
      new RegExp(sanitizeQueryParam(q), "i").test(product.title),
    );
  }, [categories, data, q]);

  if (isLoading) {
    return <FetchingProducts />;
  }

  if (error) {
    return <SomethingWentWrong error={error} />;
  }

  if (!filteredProducts) {
    return <NotFound />;
  }

  return (
    <section>
      <ProductSearchBar />

      {filteredProducts.length ? (
        <ProductList products={filteredProducts} />
      ) : (
        <section className="flex flex-col items-center gap-y-1">
          <CircleQuestionMark />
          <p className="text-center">No products found</p>
          <Button onClick={() => setQ("")}>Reset search</Button>
        </section>
      )}
    </section>
  );
};

export default ProductListQuery;
