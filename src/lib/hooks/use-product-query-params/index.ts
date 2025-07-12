"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";

const useProductQueryParams = () => {
  const [q, setQ] = useQueryState("q", {
    defaultValue: "",
    throttleMs: 340,
  });
  const [categories, setCategories] = useQueryState("categories", {
    ...parseAsArrayOf(parseAsString),
    defaultValue: [],
  });

  return { q, setQ, categories, setCategories };
};

export default useProductQueryParams;
