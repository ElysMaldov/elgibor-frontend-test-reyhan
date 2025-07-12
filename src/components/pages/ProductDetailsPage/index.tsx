import NotFound from "@/components/utils/errors/NotFound";
import SomethingWentWrong from "@/components/utils/errors/SomethingWentWrong";
import FetchingProductData from "@/components/utils/loading/FetchingProductData";
import { useGetProductByIdQuery } from "@/lib/store/apis/fake-store";
import { useParams } from "react-router";
import ProductInformation from "./ProductInformation";

export interface ProductDetailsPageProps {}

const ProductDetailsPage = ({}: ProductDetailsPageProps) => {
  const { productId } = useParams<{
    productId: string;
  }>();
  const {
    data: productData,
    error,
    isLoading,
  } = useGetProductByIdQuery(productId ?? "");

  if (isLoading) {
    return <FetchingProductData />;
  }

  if (error) {
    return <SomethingWentWrong error={error} />;
  }

  if (!productId || !productData) {
    return <NotFound />;
  }

  return <ProductInformation productData={productData} />;
};

export default ProductDetailsPage;
