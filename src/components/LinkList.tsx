"use client";

import { useEffect, useState, type ReactNode } from "react";
import LinkCard from "./LinkCard";

export type LinkItem = {
  id: string;
  title: string;
  href: string;
  icon?: ReactNode;
};

type LinkListProps = {
  links: LinkItem[];
};

type Counts = Record<string, number>;

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Counts>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: Counts) => setCounts(data))
      .catch((err) => {
        if (err?.name !== "AbortError") console.error("클릭 수 조회 실패:", err);
      });

    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 낙관적 업데이트: 응답을 기다리지 않고 먼저 +1
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true, // 페이지 이동 중에도 요청이 끊기지 않도록
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { id: string; count: number }) =>
        setCounts((prev) => ({ ...prev, [data.id]: data.count })),
      )
      .catch((err) => console.error("클릭 수 저장 실패:", err));
  };

  return (
    <nav className="mt-12 flex w-full flex-col gap-4" aria-label="링크 목록">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          title={link.title}
          href={link.href}
          icon={link.icon}
          count={counts[link.id] ?? 0}
          onClick={() => handleClick(link.id)}
        />
      ))}
    </nav>
  );
}
