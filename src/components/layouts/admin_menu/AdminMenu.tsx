"use client"
import Logo from "./design/SVG/logo.svg";
// import SearchInput from "./components/SearchInput";
// import Menu from "./components/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMenu() {
    const pathname = usePathname();
    const menu = [
        { name: "신고 관리", link: "/admin/reports" },
        { name: "상품 관리", link: "/admin/products" },
        { name: "사용자 관리", link: "/admin/users" },
        {
            name: "로그 관리", link: "/admin/logs", subMenu: [
                { name: "사용자", link: "/admin/logs/users" },
                { name: "상품", link: "/admin/logs/products" },
                { name: "거래", link: "/admin/logs/trans" },
                { name: "포인트", link: "/admin/logs/points" },
                { name: "신고", link: "/admin/logs/reports" }
            ]
        }
    ];

    return (
        <div className="dark:bg-bg-header-dark w-full">
            <div className="hidden md:flex justify-center items-center p-5">
                <div>
                    <Link href="/admin">
                        관리자
                        <Logo />
                    </Link>
                </div>
            </div>
            <hr />

            <div className="p-5">
                {menu.map((item, index) => (
                    <div key={index} className="py-2 text-left ml-20">
                        <Link
                            href={item.link}
                            className={`${pathname === item.link && "text-point-color font-bold"
                                }`}
                        >
                            <div className="cursor-pointer inline-block">{item.name}</div>
                        </Link>
                        {item.subMenu && (
                            <div className="ml-4">
                                {item.subMenu.map((subItem, subIndex) => (
                                    <div className="py-2 text-left ml-4">
                                        <Link href={subItem.link} key={subIndex}>
                                            <div className="cursor-pointer inline-block">{subItem.name}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    );
}