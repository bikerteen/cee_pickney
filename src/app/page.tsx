import Image from "next/image";
import RSVPForm from "./RSVPForm";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-yellow-500 font-sans dark:bg-yellow-50">
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-32 px-16 bg-[#FFDA00]">
        
        <Image
          className="logo.png"
          src="/logo.png"
          alt="cees pickney logo"
          width={300}
          height={100}
          priority
        />

        {/* 👇 Form goes here */}
        <RSVPForm />

      </main>
    </div>
  );
}