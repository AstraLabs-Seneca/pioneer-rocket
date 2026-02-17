import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASTRA Labs — Starship Telemetry',
  description:
    'Real-time rocket telemetry dashboard for ASTRA Labs Pioneer rocket. 3D visualization, live sensor graphs, and mission phase tracking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
