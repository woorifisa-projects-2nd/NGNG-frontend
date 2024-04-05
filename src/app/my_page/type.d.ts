interface TransactionDetails {
  transactionDetailsId: number;
  address: string;
  product: Product;
  consumer: SimpeUserInfo;
  seller: SimpeUserInfo;
  status: {
    id: number;
    status: string;
  };
}

interface Product {
  category: {
    id: number;
    name: string;
  };
  content: string;
  discountable: boolean;
  forSale: boolean;
  freeShipping: boolean;
  isEscrow: boolean;
  price: number;
  productId: number;
  title: string;
  transactionDetails: TransactionDetails;
}

interface SimpeUserInfo {
  name: string;
  phoneNumber: string;
}

interface UserGetReposne {
  accountBank: string;
  accountNumber: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  point: number;
  role: {
    roleId: number;
    roleType: string;
  };
  userId: number;
  sellList: Product[];
  buyList: TransactionDetails[];
}

interface IPointHistory {
  id: number;
  beforeCost: number;
  addCost: number;
  cost: number;
  type: string;
  typeDetail: string;
  createdAt: Date;
  typeDetail: Date;
}
