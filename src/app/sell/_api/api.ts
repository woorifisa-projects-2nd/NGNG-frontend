import { Product } from "../page";
const mapProductToAPISepc = (product: Product) => {
  // TODO userId로그인한 사람거로 수정하기
  const images = product.images.map((img) => {
    return { imageURL: URL.createObjectURL(img.image) };
  });
  return {
    title: product.title,
    content: product.content,
    price: product.price,
    isEscrow: product.isEscrow,
    discountale: product.discountable,
    purchaseAt: product.purchaseAt,
    freeShipping: product.freeShipping,
    userId: 2,
    statusId: product.statusId,
    categoryId: product.categoryId,
    tags: product.tags,
    images: product.images.map((img) => {
      return { imageURL: URL.createObjectURL(img.image) };
    }),
    thumbnailUrl: images[0].imageURL,
  };
};

export const createProduct = async (product: Product) => {
  const res = await fetch(`/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mapProductToAPISepc(product)),
  });
  return res.json();
};
