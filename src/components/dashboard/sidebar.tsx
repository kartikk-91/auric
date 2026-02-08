"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  House,
  Bot,
  MessageCircleMore,
  SquareArrowOutUpRight,
  X,
  Menu,
} from "lucide-react";

export const options = [
  { icon: House, label: "dashboard", route: "/dashboard" },
  { icon: MessageCircleMore, label: "feedbacks", route: "/dashboard/feedbacks" },
  { icon: Bot, label: "ask AI", route: "/dashboard/ask-ai" },
  { icon: SquareArrowOutUpRight, label: "share", route: "/dashboard/share" },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleNavigation = (route: string) => {
    router.push(route);
    setOpen(false);
  };

  return (
    <>
      
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu className="h-5 w-5" />
      </button>

      
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      
      <aside
        className={`
          fixed md:static z-50
          h-[100vh] w-28 bg-white
          flex flex-col items-center py-4 space-y-10
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        
        <div className="md:hidden absolute top-4 right-4">
          <button onClick={() => setOpen(false)}>
            <X className="h-5 w-5 text-transparent" />
          </button>
        </div>

        <Image src="/auric.png" alt="auric" width={70} height={70} />

       
        <nav className="space-y-6 mt-6">
          {options.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.route;

            return (
              <div
                key={index}
                onClick={() => handleNavigation(item.route)}
                className="flex flex-col items-center space-y-2 cursor-pointer"
              >
                <div
                  className={`relative p-3 rounded-md flex items-center justify-center transition
                    ${
                      isActive
                        ? "text-[#fe4e00] border border-[#fe4e0033] bg-[#fe4e001a]"
                        : "text-gray-500 border border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  {isActive && (
                    <span className="absolute left-0 h-8 w-[3px] bg-[#fe4e00] rounded-r-md" />
                  )}
                  <Icon className="size-5" />
                </div>

                <span
                  className={`capitalize text-[12px] font-medium ${
                    isActive ? "text-[#fe4e00]" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
