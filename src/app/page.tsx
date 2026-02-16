import Hero from '@/components/sections/Hero';
import Pain from '@/components/sections/Pain';
import Calculator from '@/components/sections/Calculator';
import Proof from '@/components/sections/Proof';
import Comparison from '@/components/sections/Comparison';
import Guarantee from '@/components/sections/Guarantee';
import Decision from '@/components/sections/Decision';
import Waitlist from '@/components/sections/Waitlist';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Pain />
      <Calculator />
      <Proof />
      <Comparison />
      <Guarantee />
      <Decision />
      <Waitlist />
      <Footer />
    </main>
  );
}
