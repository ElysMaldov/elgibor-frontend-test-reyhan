import CategoryFilters from "@/components/ui/inputs/ProductSearchBar/CategoryFilters";
import { Input } from "@/components/ui/shadcn/input";
import useProductQueryParams from "@/lib/hooks/use-product-query-params";
import { Search } from "lucide-react";
import { useCallback, type ChangeEventHandler } from "react";

const ProductSearchBar = () => {
  const { q, setQ } = useProductQueryParams();

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setQ(e.target.value);
    },
    [setQ],
  );

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Find Your Perfect Product
        </h1>
        <p className="text-lg text-muted-foreground">
          Search through our various products to discover exactly what you need
        </p>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <Input
          value={q}
          onChange={inputChangeHandler}
          type="search"
          placeholder="Search products..."
          className="h-12 rounded-lg border-2 pl-10 text-base focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          Search by category:
        </span>
        <CategoryFilters />
      </div>
    </div>
  );
};

export default ProductSearchBar;
