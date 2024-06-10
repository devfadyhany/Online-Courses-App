import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { LoginContextProvider } from "@/components/LoginContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online EDU App",
  description: "Created by fady hany",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <LoginContextProvider>
        <CookiesProvider>
          <body className={inter.className}>{children}</body>
        </CookiesProvider>
      </LoginContextProvider>
    </html>
  );
}
