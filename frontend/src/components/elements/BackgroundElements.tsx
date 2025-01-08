const BackgroundElements = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute bg-gradient-to-r from-[#2E6F89] to-black rounded-full mix-blend-multiply opacity-70 animate-blob filter blur-xl ${className}`}
    ></div>
  );
};

export default BackgroundElements;
