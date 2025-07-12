import { Spinner } from "@/components/ui/shadcn/spinner";

const FetchingProducts = () => {
  return (
    <section className="flex flex-col items-center gap-y-1">
      <Spinner />
      <p>Finding products...</p>
    </section>
  );
};

export default FetchingProducts;
