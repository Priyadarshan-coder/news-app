import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ReduxProvider from "./store/Provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "InfoPulse",
  description: "Read the current affairs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Nav />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
