import AdminMenu from "@/components/layouts/admin_menu/AdminMenu";
import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="w-1/4 flex justify-center border-r h-full">
                    <AdminMenu />
                </div>
            <div className="w-3/4">
                <div>{children}</div>
            </div>
        </div>
    );
}
