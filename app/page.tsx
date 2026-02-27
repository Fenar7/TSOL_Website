import AboutSection from "./components/AboutSection/AboutSection";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-main">
        <Hero />
        <AboutSection/>
      </main>
    </>
  );
}
