import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import WhyChoose from '../components/WhyChoose';
import CTASection from '../components/CTASection';
import usePageMeta from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta(
    null,
    'SLG Motors manufactures high-efficiency industrial electric motors, pumps, air compressors and wash systems in India since 1989 — ISO 9001 certified and BIS compliant.',
  );

  return (
    <>
      <Hero />
      <StatsBar />
      <WhyChoose />
      <CTASection />
    </>
  );
}
