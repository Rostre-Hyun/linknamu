import type { ReactNode } from "react";

type LinkCardProps = {
  title: string;
  href: string;
  icon?: ReactNode;
};

export default function LinkCard({ title, href, icon }: LinkCardProps) {
  // mailto: 링크는 새 탭 대신 기본 메일 앱으로 바로 연결
  const isExternal = !href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex w-full items-center justify-center rounded-[22px] border border-white/70 bg-white/55 px-6 py-[18px] text-center text-[15px] font-semibold text-stone-800 shadow-[0_8px_24px_-12px_rgba(120,72,40,0.25)] backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-px hover:bg-white/75 hover:shadow-[0_12px_28px_-12px_rgba(120,72,40,0.3)] active:translate-y-0 active:bg-white/65 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-100 dark:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)] dark:hover:bg-white/[0.1]"
    >
      {icon && (
        <span className="absolute left-5 flex h-7 w-7 items-center justify-center">
          {icon}
        </span>
      )}
      {title}
    </a>
  );
}
