import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import ServiceArea from '@/components/ServiceArea';
import FAQ from '@/components/FAQ';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <ServiceArea />
        <FAQ />
        <QuoteSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
