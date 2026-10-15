import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import WebProgress from "@/components/WebProgress";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";

export default function Page() {
  return (
    <>
      <Navbar />
      <WebProgress />
      <Cursor />
      <main>
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
        <Slide5 />
        <Slide6 />
        <Slide7 />
      </main>
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.07] mix-blend-overlay" />
    </>
  );
}
