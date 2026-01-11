"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  House,
  Bot,
  MessageCircleMore,
  SquareArrowOutUpRight,
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

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <div className="w-28 h-full bg-white flex flex-col items-center py-4 space-y-10">
      <div>
        <Image src={"/auric.png"} alt="auric" width={80} height={80} />
      </div>
      <div className="space-y-6">
        {options.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.route;

          return (
            <div
              key={index}
              className="space-y-2 flex flex-col items-center cursor-pointer"
              onClick={() => handleNavigation(item.route)}
            >
              <div
                className={`w-fit relative p-3 rounded-md flex items-center justify-center ${
                  isActive
                    ? "text-[#fe4e00] border border-[#fe4e0033] bg-[#fe4e001a]"
                    : "text-gray-500 border border-gray-300 bg-transparent hover:bg-gray-100"
                }`}
              >
                {isActive && (
                  <div className="w-[3px] h-8 rounded-r-4xl bg-[#fe4e00] absolute left-0 top-1/2 -translate-y-1/2"></div>
                )}
                <IconComponent className="size-5" />
              </div>
              <div
                className={`capitalize text-[12px] font-[500] ${
                  isActive ? "text-[#fe4e00]" : "text-gray-500"
                }`}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
