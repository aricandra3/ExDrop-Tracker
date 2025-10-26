"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useDebounce<T>(value: T, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}

export default function SearchBox() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initial = useMemo(() => params.get("q") ?? "", [params]);
  const [q, setQ] = useState(initial);
  const debounced = useDebounce(q, 450);

  useEffect(() => {
    // Sinkron jika URL berubah dari luar
    setQ(initial);
  }, [initial]);

  useEffect(() => {
    const usp = new URLSearchParams(params);
    if (debounced) usp.set("q", debounced);
    else usp.delete("q");
    startTransition(() => {
      router.replace(`${pathname}?${usp.toString()}`, { scroll: false });
    });
  }, [debounced]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      name="q"
      placeholder="Search..."
      value={q}
      onChange={(e) => setQ(e.target.value)}
      className="card px-4 py-3"
      aria-label="Search airdrops"
    />
  );
}
