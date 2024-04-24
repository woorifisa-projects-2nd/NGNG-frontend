export type User = {
  userId: number,
  name: string,
  nickName: string,
  phoneNumber: string,
  email: string,
  accountBank: string | number;
  accountNumber: string | number;
  address: string,
  role: {
    roleId: number,
    roleType: string
  },
  point: number
}


