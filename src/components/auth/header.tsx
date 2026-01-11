
interface HeaderProps {
  label: string;
  desc: string;
}

const Header = ({ label, desc }: HeaderProps) => {
  return (
    <div className="text-center space-y-3">
      <h1 className="font-switzer font-extrabold text-3xl tracking-tight 
                 bg-gradient-to-r from-[#8a43e1] via-[#d97706] to-[#f59e0b] 
                 bg-clip-text text-transparent">
        {label}
      </h1>
      <p className="text-gray-700 text-[15px]">
        {desc}
      </p>
    </div>

  );
};

export default Header;