
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Personas from "@/components/Personas";
import Pricing from "@/components/Pricing";
import Roadmap from "@/components/Roadmap";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Personas />
        <Pricing />
        <Roadmap />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
