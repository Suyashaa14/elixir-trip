import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Philosophy } from "../components/Philosophy";
import { Retreats } from "../components/Retreats";
import { Testimonials } from "../components/Testimonials";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import UpcomingRetreats from "@/components/UpcomingRetreats";
import NewRetreats from "@/components/NewRetreats";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Philosophy />
      {/* <Retreats />
       */}
       <NewRetreats/>
      <UpcomingRetreats/>
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
