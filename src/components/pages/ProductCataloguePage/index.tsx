import ProductSearchBar from "@/components/ui/inputs/ProductSearchBar";
import ProductList from "@/components/ui/lists/ProductList";
import SomethingWentWrong from "@/components/utils/errors/SomethingWentWrong";
import FetchingProducts from "@/components/utils/loading/FetchingProducts";
import { useListProductsQuery } from "@/lib/store/apis/fake-store";

const ProductCataloguePage = () => {
  const { data, error, isLoading } = useListProductsQuery();

  if (error) {
    return <SomethingWentWrong error={error} />;
  }

  return (
    <section>
      <ProductSearchBar onInputChange={(val) => console.log(val)} />

      {isLoading && <FetchingProducts />}
      {data && <ProductList products={data} />}
    </section>
  );
};

export default ProductCataloguePage;
