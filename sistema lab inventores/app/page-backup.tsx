// src/app/page.js
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Carousel from "@/components/Carousel";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Carousel />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}