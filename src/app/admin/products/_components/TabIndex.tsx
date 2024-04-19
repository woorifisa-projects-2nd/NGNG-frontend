type TabIndexProps = {
  order: number;
  isLast: boolean;
  addProduct: () => void;
  click: (order: number) => void;
  currentOrder: number;
};
export default function TabIndex({
  order,
  isLast,
  addProduct,
  click,
  currentOrder,
}: TabIndexProps) {
  return (
    <div className="flex ">
      <div
        className={`cursor-pointer border-[1px] border-b-0 border-black dark:border-white w-20 h-7 flex justify-center items-center ${
          order !== 0 && isLast && "border-l-0"
        } ${
          order === currentOrder &&
          "bg-point-color text-white border-point-color"
        }`}
        onClick={() => click(order)}
      >
        {order + 1}
      </div>
      {isLast && (
        <div
          className="cursor-pointer h-7 w-6 flex justify-center items-center bg-light-gray dark:bg-black border-[1px] border-l-0 border-b-0 border-black dark:border-white dark:text-white text-xl"
          onClick={addProduct}
        >
          +
        </div>
      )}
    </div>
  );
}
