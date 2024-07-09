"use client";

import { ReportProblem, TipsAndUpdates } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function UserSidebar() {
  const router = useRouter();
  return (
    <div className="hidden md:flex flex-col w-fit bg-gray-800">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex flex-col px-2 py-4 bg-gray-800">
          <button onClick={() => router.push("/user-dashboard")}>
            <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
              <ReportProblem className="mr-2" />
              Report Problems
            </span>
          </button>
          <button onClick={() => router.push("/user-solutions")}>
            <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
              <TipsAndUpdates className="mr-2" />
              Post Solutions
            </span>
          </button>
        </nav>
      </div>
    </div>
  );
}
