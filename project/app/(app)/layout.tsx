import { Sidebar } from '@/components/app/sidebar';
import { TopNav } from '@/components/app/topnav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-60">
        <TopNav />
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
