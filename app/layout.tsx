'use client';
import './globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Login from '@/components/login';
import { Skeleton } from '@/components/ui/skeleton';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AuthWrapper>
            <Navbar />
            {children}
          </AuthWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <Skeleton />;
  }

  if (!session) {
    return <Login />;
  }

  return <>{children}</>;
}
