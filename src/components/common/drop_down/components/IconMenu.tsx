type IconMenuProps = {
  items: any[];
};
export default function IconMenu({ items }: IconMenuProps) {
  return (
    <div
      className={`relative right-[7.25rem] bg-white dark:bg-black w-full h-full min-w-36 min-h-[7.5rem] shadow-xl border-[1px] border-solid boder-light-gray`}
    >
      {items.map((item) => {
        return <>{item}</>;
      })}
    </div>
  );
}
