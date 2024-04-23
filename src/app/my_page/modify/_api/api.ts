import { getAccessToken } from "../../_utils/auth-header";

type UpdateProductRequest = {
  userId: number;
  title: string;
  content: string;
  price: number;
  isEscrow: boolean;
  discountable: boolean;
  forSale: boolean;
  visible: boolean;
  purchaseAt: string;
  //   visible: boolean;
  //   refreshedAt: Date;
  freeShipping: boolean;
  statusId: number;
  categoryId: number;
  //   thumbnailUrl: string;
  tags: {
    name: string;
  }[];
  //   images: {
  //     imageURL: string;
  //   }[];
};

// userId,
// title: product.title,
// content: product.content,
// price: product.price,
// isEscrow: product.isEscrow,
// discountable: product.discountable,
// forSale: product.forSale,
// visible: product.visible,
// purchaseAt: product.purchaseAt,
// freeShipping: product.freeShipping,
// statusId: product.status.id,
// categoryId: product.category.id,
// tags: product.tags,

export const updateProdctByUpdateProductRequest = ({
  deleteOldImages,
  newImages,
  newProduct,
  origin,
}: {
  newProduct: UpdateProductRequest;
  deleteOldImages: string[];
  newImages: File[];
  origin: Product;
}) => {
  console.log(newProduct);
  console.log(deleteOldImages);
  console.log(newImages);

  fetch(`/api/products/${origin.id}`, {
    method: "PUT",
    cache: "no-cache",
    redirect: "follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(newProduct),
  });
};

const createImages = async (productId: string, images: File[]) => {
  const fomData = new FormData();

  images.forEach((image) => {
    fomData.append("files", image);
  });
  fomData.append("productId", productId);

  return await fetch("/api/upload", {
    method: "POST",
    headers: {
      Authorization: getAccessToken(),
    },
    body: fomData,
  });
};
