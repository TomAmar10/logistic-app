export enum StatusOrder {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    DECLINED = "DECLINED",
  }

interface Order{
  _id:string;
    id_user: string;
  order_date: Date;
  status: StatusOrder;
  items: string[];
}

export default Order;