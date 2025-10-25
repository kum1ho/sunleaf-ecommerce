import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AIChatWidget from './AIChatWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
