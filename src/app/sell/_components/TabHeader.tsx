import { Product } from "../page";
import TabIndex from "./TabIndex";

export default function TabHeader({ products }: { products: Product[] }) {
  return (
    <div className="pt-10">
      {products.map((p) => (
        <TabIndex order={p.order} isLast={p.order == products.length} />
      ))}
    </div>
  );
}
