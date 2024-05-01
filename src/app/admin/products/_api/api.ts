import { Product } from "../[id]/page";
import { getAccessToken } from "../_utils/auth-header";

export const getProductById = async (id: number) => {
  const res = await fetch(`/products/${id}`);
  return res.json();
};

const mapProductToAPISepc = (product: Product) => {
  // TODO 관리자가 수정
  const userId = 1;

  return {
    userId,
    title: product.title,
    content: product.content,
    price: product.price,
    isEscrow: product.isEscrow,
    discountable: product.discountable,
    forSale: product.forSale,
    visible: product.visible,
    purchaseAt: product.purchaseAt,
    freeShipping: product.freeShipping,
    statusId: product.status.id,
    categoryId: product.category.id,
    tags: product.tags,
  };
};

export const createProduct = async (product: Product): Promise<boolean> => {
  // console.log(mapProductToAPISepc(product));

  const res = await fetch(`/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(mapProductToAPISepc(product)),
  });

  if (res.ok === true) {
    const productId = await res.text();
    if (product.images.length > 0) {
      const resImages = await createImages(productId, product.images);
      return resImages.ok;
    }
    return true;
  }

  return false;

  // const resImages = await updateImages("1", product.images);
  // return resImages.ok;
};

export const deleteImageById = async (productId: number, imageURL: string) => {
  const deleteData = {
    imageURL: imageURL,
  };

  const response = await fetch(`/api/deleteImage/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
    body: JSON.stringify(deleteData),
  });
  return response.ok;
};

export const deleteImages = async (productId: number) => {
  const response = await fetch(`/api/deleteImage/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessToken(),
    },
  });
  return response.ok;
};

const createImages = async (
  productId: string,
  images: {
    id: number;
    imageURL: File;
  }[]
) => {
  const fomData = new FormData();

  images.forEach((image) => {
    fomData.append("files", image.imageURL);
  });
  fomData.append("productId", productId);

  // console.log(fomData);

  // return await fetch("/api/upload", {
  return await fetch(`/api/upload`, {
    method: "POST",
    headers: {
      Authorization: getAccessToken(),
    },
    body: fomData,
  });
};
