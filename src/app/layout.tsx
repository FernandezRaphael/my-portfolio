import type { Metadata } from "next";
import "./globals.css"; // Import des styles globaux

// Métadonnées pour la page
export const metadata: Metadata = {
  title: "Raphaël Fernandez",
  description: "Mon Portfolio",
};

// Layout principal avec la configuration de ta police personnalisée
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
