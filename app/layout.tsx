import type { Metadata, ResolvedMetadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("settings");

  return {
    title: page.data.site_title || "",
    description: page.data.meta_description || "",
    openGraph: {
      images: [page.data.og_image.url || ""],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
