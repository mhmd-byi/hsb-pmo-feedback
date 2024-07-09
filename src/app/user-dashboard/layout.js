import { Inter } from "next/font/google";
import Header from "../common/header";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserSidebar from "../common/userSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HSB PMO Feedback App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <UserSidebar />
          <main className="flex-1 p-4 bg-gray-100 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
