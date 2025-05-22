import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/providers/react-query";
import PathChecker from "./PathChecker";
import { preloadLayout } from "@/server-actions/auth/preload-data";
import { HydrationBoundary } from "@tanstack/react-query";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// export const dynamic = "force-dynamic";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const { dehydratedState } = await preloadLayout();

  return (
    <html dir={locale == "ar" ? "rtl" : "ltr"} lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AppProvider>
          <NextIntlClientProvider messages={messages}>
            <main className="max-w-[100vw] overflow-hidden">
              <HydrationBoundary state={dehydratedState}>
                <Navbar />
                <PathChecker />
                {children}
                <Toaster />
                <Footer />
              </HydrationBoundary>
            </main>
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
