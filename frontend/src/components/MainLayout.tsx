import Navbar from "./Navbar";
import Footer from "./Footer";

interface MainLayoutTypes {
  children: React.ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const MainLayout: React.FC<MainLayoutTypes> = ({
  children,
  darkMode,
  setDarkMode,
}) => {
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "text-textLight" : "text-gray-900"
      }`}
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
