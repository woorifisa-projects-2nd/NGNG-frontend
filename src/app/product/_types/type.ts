type User = {
  id: number;
  name: string;
  nickname: string;
};

type Status = {
  id: number;
  name: string;
};

export type Tag = {
  tagName: string;
};

type Image = {
  id: number;
  imageURL: string;
};

export type Chat = {
  id: number;
  message: string;
  userId: number;
  userName: string;
  userNickName: string;
  createdAt: string;
  isImage?: boolean;
};

export type Product = {
  id: number;
  available: boolean;
  title: string;
  content: string;
  price: number;
  isEscrow: boolean;
  discountable: boolean;
  purchaseAt: string | null;
  forSale: boolean;
  createdAt: string;
  updatedAt: string | null;
  visible: boolean;
  freeShipping: boolean;
  refreshedAt: string | null;
  user: User;
  status: Status;
  category: {
    id: number;
    name: string;
  };
  tags: Tag[];
  images: Image[];
  chats: Chat[];
};
