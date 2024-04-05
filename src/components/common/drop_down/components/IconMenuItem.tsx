import Link from "next/link";
type IconMenuItemProps = {
  link: string;
  icon: any;
  name: string;
};
export const IconMenuItem = ({ icon, link, name }: IconMenuItemProps) => {
  return (
    <Link href={link}>
      <div className="cursor-pointer flex justify-start items-center gap-1 p-2 hover:bg-light-gray/50">
        {icon} {name}
      </div>
    </Link>
  );
};
