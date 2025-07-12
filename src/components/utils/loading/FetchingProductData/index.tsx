import { Spinner } from "@/components/ui/shadcn/spinner";

const FetchingProductData = () => {
  return (
    <section className="flex flex-col items-center gap-y-1">
      <Spinner />
      <p>Getting product...</p>
    </section>
  );
};

export default FetchingProductData;
