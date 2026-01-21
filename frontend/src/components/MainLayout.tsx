import { memo } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MainLayoutTypes {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);

const MainLayout: React.FC<MainLayoutTypes> = ({
  children,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div
      className={`min-h-screen flex flex-col ${darkMode ? "text-textLight" : "text-gray-900"
        }`}
    >
      <MemoizedNavbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="flex-grow relative w-full">
        {children}
      </main>

      <MemoizedFooter />
    </div>
  );
};

export default MainLayout;
