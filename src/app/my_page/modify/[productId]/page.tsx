import React, { Suspense } from "react";
import UpdateProductId from "./_compoents/UpdateProductId";

export default function page({ params }: { params: { productId: string } }) {
  return <UpdateProductId productId={+params.productId}></UpdateProductId>;
}
