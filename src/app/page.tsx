import Image from "next/image";
import IntroSplash from "./IntroSplash";
import RSVPForm from "./RSVPForm";

export default function Home() {
  return (
    <IntroSplash>
      <div className="flex min-h-screen items-center justify-center bg-yellow-500 font-sans dark:bg-yellow-50">
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#FFDA00] px-16 py-32">
          <Image
            className="logo.png"
            src="/logo.png"
            alt="cees pickney logo"
            width={300}
            height={100}
            priority
          />

          <RSVPForm />
        </main>
      </div>
    </IntroSplash>
  );
}