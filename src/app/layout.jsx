import localFont from "next/font/local";
import "./globals.css";
import "../global states/form-context";
import { FormProvider } from "../global states/form-context";
import "./bootstrap-5.2.3-dist/css/bootstrap.css";
import "./JS/all";
import { AuthProvider } from "./providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TTMS Home",
  description: "developed by Guy Stephane",
};

export default function RootLayout({ children }) {
  return (
    <FormProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {<AuthProvider>{children}</AuthProvider>}
        </body>
      </html>
    </FormProvider>
  );
}
