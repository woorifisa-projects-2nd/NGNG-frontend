type TransactionDetails = {
  id: number;
  address: string;
  product: {
    productId: number;
    title: string;
    price: number;
    isEscrow: boolean;
    purchaseAt: Date | null;
    visible: boolean;
    freeShipping: boolean;
    status: string;
    category: string;
  };
  consumer: {
    name: string;
    phoneNumber: string;
  };
  seller: {
    name: string;
    phoneNumber: string;
  };
  status: {
    id: number;
    status: string;
  };
};

type Product = {
  id: number;
  title: string;
  content: string;
  price: number;
  isEscrow: boolean;
  discountable: boolean;
  purchaseAt: Date | null;
  forSale: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  visible: boolean;
  freeShipping: boolean;
  available: boolean;
  refreshedAt: Date | null;
  user: {
    id: number;
    name: string;
    nickname: string;
  };
  status: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  tags: { tagName: string }[];
  images: { id: number; imageURL: string; visible: boolean }[];
  thumbnail: {
    id: number;
    thumbnailURL: string;
  };
  transactionDetails: TransactionDetails | null;
};

type SimpeUserInfo = {
  name: string;
  phoneNumber: string;
};

type IPointHistory = {
  id: number;
  beforeCost: number;
  addCost: number;
  cost: number;
  type: string;
  typeDetail: string;
  createdAt: Date;
  typeDetail: Date;
};

type UpdateTransactionDetailsStatusResponse = {
  id: number;
  address: string;
  product: {
    productId: number;
    title: string;
    price: number;
    isEscrow: boolean;
    purchaseAt: boolean;
    visible: boolean;
    freeShipping: boolean;
    status: string;
    category: string;
  };
  consumer: {
    name: string;
    phoneNumber: string;
  };
  seller: {
    name: string;
    phoneNumber: string;
  };
  status: {
    id: number;
    status: string;
  };
};
type UpdateTransDetiilsFunctionParameter = {
  data: { transactionDetailsId: number; status: string };
  Done?: () => void;
  Fiall?: (err: any) => void;
};

type MypageReponse = {
  userId: number;
  name: string;
  nickName: string;
  phoneNumber: string;
  email: string;
  accountBank: string | null;
  accountNumber: string | null;
  address: string;
  role: {
    roleId: number;
    roleType: string;
  };
  point: number;
  sellList: Product[];
  buyList: TransactionDetails[];
};
