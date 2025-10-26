"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type TabCounts = { todo: number; prog: number; done: number };

const LABELS = [
  { key: "All",        label: "All",        countKey: null as null },
  { key: "To-Do",      label: "To-Do",      countKey: "todo" as const },
  { key: "In Progress",label: "In Progress",countKey: "prog" as const },
  { key: "Complete",   label: "Complete",   countKey: "done" as const },
];

export default function Tabs({ counts }: { counts: TabCounts }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("tab") ?? "All";

  const makeHref = (tab: string) => {
    const usp = new URLSearchParams(params);
    usp.set("tab", tab);
    return `${pathname}?${usp.toString()}`;
  };

  const getCount = (k: typeof LABELS[number]["countKey"]) => {
    if (k === "todo") return counts.todo;
    if (k === "prog") return counts.prog;
    if (k === "done") return counts.done;
    return undefined;
  };

  return (
    <div className="card p-1 flex items-center gap-2 overflow-auto">
      {LABELS.map(({ key, label, countKey }) => {
        const active = current === key;
        const c = getCount(countKey);
        return (
          <Link
            key={key}
            href={makeHref(key)}
            scroll={false}
            prefetch={false}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2
              ${active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5"}`}
          >
            <span>{label}</span>
            {typeof c === "number" && (
              <span className={`px-2 py-0.5 rounded-lg text-xs
                ${active ? "bg-white/20 text-white" : "bg-white/10 text-slate-200"}`}>
                {c}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
