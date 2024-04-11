import { Product } from "../page";
import TabIndex from "./TabIndex";

export default function TabHeader({ products }: { products: Product[] }) {
  return (
    <div className="py-10">
      {products.map((p, key) => (
        <TabIndex
          key={key}
          order={p.order}
          isLast={p.order == products.length}
        />
      ))}
    </div>
  );
}
