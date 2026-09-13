import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  imageSrc: string;
};

export default function Profile({ name, bio, imageSrc }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* 바깥 링 + 그림자로 살짝 떠 있는 입체감 */}
      <div className="rounded-full bg-gradient-to-br from-white/90 to-orange-100/60 p-1.5 shadow-[0_12px_32px_-8px_rgba(120,72,40,0.28)] ring-1 ring-white/70 dark:from-white/10 dark:to-orange-200/10 dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)] dark:ring-white/10">
        <Image
          src={imageSrc}
          alt={`${name} 프로필 사진`}
          width={160}
          height={160}
          priority
          className="h-36 w-36 rounded-full object-cover shadow-inner sm:h-40 sm:w-40"
        />
      </div>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
        {bio}
      </p>
    </section>
  );
}
