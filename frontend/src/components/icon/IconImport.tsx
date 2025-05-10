<<<<<<< HEAD
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DynamicIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className,
  size = 24,
}) => {
  const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;

  if (!IconComponent) {
    return (
      <div
        className={`flex items-center justify-center text-pink-400 text-bold ${className}`}
        style={{ width: size, height: size, borderRadius: 4 }}
      >
        ?
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
=======
import * as icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DynamicIconProps {
  iconName: string;
  size?: number;
  className?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({
  iconName,
  className,
  size = 24,
}) => {
  const IconComponent = icons[iconName as keyof typeof icons] as LucideIcon;

  console.log(IconComponent);

  if (!IconComponent) {
    return (
      <div
        className={`flex items-center justify-center text-pink-400 text-bold ${className}`}
        style={{ width: size, height: size, borderRadius: 4 }}
      >
        ?
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};

export default DynamicIcon;
>>>>>>> portfolio-v2
