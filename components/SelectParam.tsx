"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SelectParam({
  name,
  value,
  options,
  labelAll,
}: {
  name: string;
  value?: string | null;
  options: string[];
  labelAll: string;
}) {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (v: string) => {
    const usp = new URLSearchParams(params);
    if (v) usp.set(name, v);
    else usp.delete(name);
    router.replace(`${pathname}?${usp.toString()}`, { scroll: false });
  };

  return (
    <select
      name={name}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="card px-4 py-3"
    >
      <option value="">{labelAll}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}
