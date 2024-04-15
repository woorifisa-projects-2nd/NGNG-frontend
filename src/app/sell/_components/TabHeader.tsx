import { Product } from "../page";
import TabIndex from "./TabIndex";

type TabHeaderType = {
  addProduct: () => void;
  products: Product[];
  changeOrder: (order: number) => void;
  currentOrder: number;
};

export default function TabHeader({
  products,
  addProduct,
  changeOrder,
  currentOrder,
}: TabHeaderType) {
  return (
    <div className="flex my-10 border-t-0 border-l-0 border-r-0 border-[1px] border-b-1 border-black dark:border-white ">
      {products.map((p) => (
        <TabIndex
          key={p.order}
          order={p.order}
          isLast={p.order == products.length - 1}
          addProduct={addProduct}
          click={changeOrder}
          currentOrder={currentOrder}
        />
      ))}
    </div>
  );
}
