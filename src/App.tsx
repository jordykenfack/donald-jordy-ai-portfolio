import { MotionConfig } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import VslSection from './sections/VslSection';
import ServicesSection from './sections/ServicesSection';
import SystemSection from './sections/SystemSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import FloatingCta from './components/FloatingCta';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <main className="bg-[#0C0C0C]" style={{ overflowX: 'clip' }}>
          <HeroSection />
          <VslSection />
          <MarqueeSection />
          <ServicesSection />
          <SystemSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
          <FloatingCta />
        </main>
      </SmoothScroll>
    </MotionConfig>
  );
}
