import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { CookiesProvider } from "next-client-cookies/server";
import { LoginContextProvider } from "@/components/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Online EDU App",
  description: "Created by fady hany",
};

export const API_URL = "https://online-edu-app.onrender.com:8000/api/v1/";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <CookiesProvider>
        <LoginContextProvider>
          <body className={inter.className}>
            {children}
            <ToastContainer />
          </body>
        </LoginContextProvider>
      </CookiesProvider>
    </html>
  );
}
