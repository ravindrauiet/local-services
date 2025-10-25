'use client';

import { SimpleAdminAuthProvider } from '@/contexts/SimpleAdminAuthContext';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SimpleAdminAuthProvider>
      {children}
    </SimpleAdminAuthProvider>
  );
}
