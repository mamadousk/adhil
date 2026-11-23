import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Commitments } from "@/components/home/Commitments";
import { HomeFaq } from "@/components/home/HomeFaq";
import { CtaBanner } from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Process />
      <Commitments />
      <HomeFaq />
      <CtaBanner />
    </main>
  );
}
