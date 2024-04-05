type TabIndexProps = {
  order: number;
  isLast: boolean;
};
export default function TabIndex({ order, isLast }: TabIndexProps) {
  return (
    <div className="flex border-t-0 border-l-0 border-r-0 border-[1px] border-b-1 border-black dark:border-white ">
      <div className="cursor-pointer border-[1px] border-b-0 border-black dark:border-white w-20 h-7 flex justify-center items-center">
        {order}
      </div>
      {isLast && (
        <div className="cursor-pointer h-7 w-6 flex justify-center items-center bg-light-gray dark:bg-black border-[1px] border-l-0 border-b-0 border-black dark:border-white dark:text-white text-xl">
          +
        </div>
      )}
    </div>
  );
}
