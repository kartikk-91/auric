"use client";


interface BackButtonProps {
  href: string;
  label: string;
  linkText: string;
}

const BackButton = ({ href, label, linkText }: BackButtonProps) => {
  return (
    <p className="text-center text-sm text-gray-700 w-full" >
      {label}{" "}
      <a href={href} className="text-[#8a43e1] font-medium hover:underline">
        {linkText}
      </a>
    </p>

  );
};

export default BackButton;