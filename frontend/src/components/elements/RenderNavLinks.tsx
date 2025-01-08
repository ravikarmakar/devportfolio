import React from "react";
import { Link } from "react-router-dom";

interface RenderNavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
  darkMode: boolean;
  onClick?: () => void; // onClick is now optional, as it is only needed for mobile menu
}

const RenderNavLink: React.FC<RenderNavLinkProps> = ({
  to,
  label,
  isActive,
  darkMode,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={`capitalize ${
        isActive ? "text-accent" : darkMode ? "text-textLight" : "text-gray-700"
      } hover:text-accent transition-colors`}
      onClick={onClick} // handle the click event here for mobile view
    >
      {label}
    </Link>
  );
};

export default RenderNavLink;
