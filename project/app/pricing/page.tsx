import { MarketingNav } from '@/components/marketing/nav';
import { Pricing } from '@/components/marketing/pricing';
import { FAQ } from '@/components/marketing/faq';
import { Footer } from '@/components/marketing/footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
