import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { LoginContextProvider } from "@/components/LoginContext";

const inter = Inter({ subsets: ["latin"] });

// const metadata = {
//   title: "Online EDU App",
//   description: "Created by fady hany",
// };

export const API_URL = "http://localhost:8000/api/v1/";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CookiesProvider>
        <LoginContextProvider>
          <body className={inter.className}>{children}</body>
        </LoginContextProvider>
      </CookiesProvider>
    </html>
  );
}
