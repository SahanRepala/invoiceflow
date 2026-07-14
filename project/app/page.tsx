import { MarketingNav } from '@/components/marketing/nav';
import { Hero } from '@/components/marketing/hero';
import { TrustedBy } from '@/components/marketing/trusted-by';
import { Features } from '@/components/marketing/features';
import { Stats } from '@/components/marketing/stats';
import { Testimonials } from '@/components/marketing/testimonials';
import { Pricing } from '@/components/marketing/pricing';
import { FAQ } from '@/components/marketing/faq';
import { CTA } from '@/components/marketing/cta';
import { Footer } from '@/components/marketing/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Stats />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
