"use client";

import { useQueryState } from "nuqs";

const useProductQueryParams = () => {
  const [q, setQ] = useQueryState("name", {
    defaultValue: "",
  });

  return { q, setQ };
};

export default useProductQueryParams;
