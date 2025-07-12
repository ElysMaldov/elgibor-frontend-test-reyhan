import { Badge } from "@/components/ui/shadcn/badge";
import NotFound from "@/components/utils/errors/NotFound";
import SomethingWentWrong from "@/components/utils/errors/SomethingWentWrong";
import FetchingProducts from "@/components/utils/loading/FetchingProducts";
import useProductQueryParams from "@/lib/hooks/use-product-query-params";
import { useListCategoriesQuery } from "@/lib/store/apis/fake-store";

const CategoryFilters = () => {
  const { data, error, isLoading } = useListCategoriesQuery();
  const { categories: selectedCategories } = useProductQueryParams();

  if (isLoading) {
    return <FetchingProducts />;
  }

  if (error) {
    return <SomethingWentWrong error={error} />;
  }

  if (!data) {
    return <NotFound />;
  }

  const categoryFilters = data.map((category) => {
    const isSelected = Boolean(
      selectedCategories?.find(
        (selectedCategory) => selectedCategory === category,
      ),
    );

    return (
      <li key={category}>
        <CategoryFilter
          isSelected={isSelected}
          category={category}
        />
      </li>
    );
  });

  return (
    <ul className="flex flex-row flex-wrap justify-center gap-1">
      {categoryFilters}
    </ul>
  );
};

export default CategoryFilters;

interface CategoryFilterProps {
  category: string;
  isSelected: boolean;
}

const CategoryFilter = ({ isSelected, category }: CategoryFilterProps) => {
  const { setCategories } = useProductQueryParams();

  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        setCategories((prev) => {
          if (prev?.includes(category)) {
            return prev.filter((c) => c !== category);
          } else {
            return [...(prev || []), category];
          }
        });
      }}
    >
      <Badge variant={isSelected ? "default" : "outline"}>{category}</Badge>
    </button>
  );
};
