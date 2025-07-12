"use client";

import { useQueryState } from "nuqs";
import { useState } from "react";

const useProductQueryParams = () => {
  const [queryQ, setQueryQ] = useQueryState("name", {
    defaultValue: "",
    throttleMs: 340,
  });
  const [q, setQ] = useState(queryQ);

  const handleQChange = (val: string) => {
    setQ(val);
    setQueryQ(val);
  };

  return { q, setQ: handleQChange };
};

export default useProductQueryParams;
