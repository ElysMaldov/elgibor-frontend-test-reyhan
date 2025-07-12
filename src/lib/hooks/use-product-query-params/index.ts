"use client";

import { useQueryState } from "nuqs";

const useProductQueryParams = () => {
  const [q, setQ] = useQueryState("name", {
    defaultValue: "",
    throttleMs: 340,
  });

  return { q, setQ };
};

export default useProductQueryParams;
