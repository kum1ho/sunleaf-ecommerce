import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AIChatWidget from './AIChatWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8 max-w-7xl w-full">
        {children}
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  );
}
