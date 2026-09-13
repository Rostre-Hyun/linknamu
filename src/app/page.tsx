import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

const profile = {
  name: "Harry Hyun",
  bio: "인사 시스템을 만들어가는 사람",
  imageSrc: "/profile.svg",
};

const links = [
  {
    title: "GitHub",
    href: "https://github.com/Rostre-Hyun",
    icon: <GitHubIcon className="h-7 w-7 text-neutral-900 dark:text-white" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/%EC%8A%B9%EC%84%9D-%ED%98%84-0b7985119/",
    icon: <LinkedInIcon className="h-7 w-7" />,
  },
  {
    title: "Email",
    href: "mailto:rostre35@gmail.com",
    icon: <MailIcon className="h-7 w-7" />,
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col items-center px-7 pb-20 pt-20 sm:px-8 sm:pt-24">
      <Profile {...profile} />

      <nav className="mt-12 flex w-full flex-col gap-4" aria-label="링크 목록">
        {links.map((link) => (
          <LinkCard key={link.title} {...link} />
        ))}
      </nav>
    </main>
  );
}
