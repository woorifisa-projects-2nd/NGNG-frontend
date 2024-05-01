import Logo from "./design/SVG/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useContext } from "react";
import { UserContext } from "@/providers/UserContext";

export default function AdminMenu({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useContext(UserContext);

  const clickLogout = () => {
    logout();
    router.push("/");
  };

  const menu = [
    { name: "신고 관리", link: "/admin/reports/" },
    { name: "상품 관리", link: "/admin/products/" },
    { name: "사용자 관리", link: "/admin/users/" },
    {
      name: "로그 관리",
      link: "/admin/logs/users",
      subMenu: [
        { name: "사용자", link: "/admin/logs/users" },
        { name: "상품", link: "/admin/logs/products" },
        { name: "신고", link: "/admin/logs/reports" },
        { name: "패널티", link: "/admin/logs/penalties" },
        { name: "거래", link: "/admin/logs/trans" },
        { name: "포인트", link: "/admin/logs/points" },
      ],
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <div className="p-5 flex justify-center">
          <Link href="/admin/reports">
            <div className="flex flex-col items-center">
              <span>관리자</span>
              <Logo />
            </div>
          </Link>
        </div>
        <hr />

        {menu.map((item, index) => (
          <div key={index} className="mt-5 text-left ml-28">
            <Link
              href={item.link}
              className={`${
                pathname.includes(item.link) && "text-point-color font-bold"
              }`}
            >
              <div className="cursor-pointer inline-block">{item.name}</div>
            </Link>
            {item.subMenu && (
              <div className="ml-4">
                {item.subMenu.map((subItem, subIndex) => (
                  <div key={subIndex} className="py-2 text-left ml-4">
                    <Link
                      href={subItem.link}
                      className={`${
                        pathname.includes(subItem.link) &&
                        "text-point-color font-bold"
                      }`}
                    >
                      <div className="cursor-pointer inline-block">
                        {subItem.name}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div>
          <button
            className="block absolute right-14 top-10 bottom-0 border p-2 border-black md:bottom-[88%] "
            onClick={clickLogout}
          >
            로그아웃
          </button>
        </div>
      </div>
      <div className="w-3/4 p-10">{children}</div>
    </div>
  );
}
