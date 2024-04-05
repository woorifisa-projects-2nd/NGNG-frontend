import SellIcon from "../design/SVG/sell.svg";
import MyPageIcon from "../design/SVG/my_page.svg";
import ChatIcon from "../design/SVG/chat.svg";
import MenuIcon from "../design/SVG/menu.svg";
import { useState } from "react";
import Link from "next/link";
import IconDropDown from "@/components/common/drop_down/IconDropDown";
import { IconMenuItem } from "@/components/common/drop_down/components/IconMenuItem";

const iconMenus = [
  <IconMenuItem
    icon={<SellIcon className="fill-black dark:fill-white" />}
    link="/sell"
    name="판매하기"
  />,
  <IconMenuItem
    icon={<MyPageIcon className="fill-black dark:fill-white" />}
    link="/my_page"
    name="내 상점"
  />,
  <IconMenuItem
    icon={<ChatIcon className="fill-black dark:fill-white" />}
    link="/chat"
    name="채팅하기"
  />,
];

export default function AtferLoginMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const changeMenuOpen = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <IconDropDown
        data={iconMenus}
        icon={
          <MenuIcon
            className="flex md:hidden justify-center items-center cursor-pointer fill-black dark:fill-white"
            onClick={changeMenuOpen}
          />
        }
        isOpen={menuOpen}
      />

      <div className="hidden md:flex justify-between items-center gap-4">
        {iconMenus.map((menu) => {
          return menu;
        })}
      </div>
    </div>
  );
}
