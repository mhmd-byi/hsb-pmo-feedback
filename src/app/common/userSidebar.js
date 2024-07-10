'use client';

import { ReportProblem, TipsAndUpdates, Visibility, Menu, Close } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserSidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        className="text-white bg-gray-800 p-2 fixed top-30 z-30 md:hidden hover:bg-gray-700 transition-colors"
        onClick={toggleSidebar}
      >
        {isOpen ? <Close className='fixed right-10 top-5' /> : <Menu />}
      </button>

      {/* Mobile Sidebar (Slide Over) */}
      <div
        className={`${
          isOpen ? 'fixed inset-0 bg-gray-800 z-20' : 'hidden'
        } md:hidden transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex flex-col px-2 py-4">
            <button
              onClick={() => {
                toggleSidebar();
                router.push('/user-dashboard');
              }}
            >
              <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <ReportProblem className="mr-2" />
                Report Problems
              </span>
            </button>
            <button
              onClick={() => {
                toggleSidebar();
                router.push('/user-solutions');
              }}
            >
              <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <TipsAndUpdates className="mr-2" />
                Post Solutions
              </span>
            </button>
            <button
              onClick={() => {
                toggleSidebar();
                router.push('/user-observations');
              }}
            >
              <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                <Visibility className="mr-2" />
                All observations
              </span>
            </button>
          </nav>
        </div>
      </div>
      <div className="hidden md:block md:bg-gray-800">
        <div className="hidden md:flex flex-col w-fit bg-gray-800">
          <div className="flex flex-col flex-1 overflow-y-auto">
            <nav className="flex flex-col px-2 py-4 bg-gray-800">
              <button onClick={() => router.push('/user-dashboard')}>
                <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                  <ReportProblem className="mr-2" />
                  Report Problems
                </span>
              </button>
              <button onClick={() => router.push('/user-solutions')}>
                <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                  <TipsAndUpdates className="mr-2" />
                  Post Solutions
                </span>
              </button>
              <button onClick={() => router.push('/user-observations')}>
                <span className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700">
                  <Visibility className="mr-2" />
                  All observations
                </span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
