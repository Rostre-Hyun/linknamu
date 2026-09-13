import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";

// TODO: 실제 프로필 정보로 교체
const profile = {
  name: "현승석",
  bio: "인사 시스템 만드는 자",
  imageSrc: "/profile.svg",
};

// TODO: 실제 링크 URL로 교체
const links = [
  { title: "GitHub", href: "https://github.com" },
  { title: "LinkedIn", href: "https://www.linkedin.com" },
  { title: "Blog", href: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-6 py-16">
      <Profile {...profile} />

      <nav className="mt-10 flex w-full flex-col gap-6" aria-label="링크 목록">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
