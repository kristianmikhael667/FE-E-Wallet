export interface ResponsePpob {
  data: DataPpob[];
}

export interface DataPpob {
  category: Category;
  product_id: string;
  category_id: string;
  price: number;
  base_price: number;
  fee: number;
  admin: number;
  sku: string;
  name: string;
  description: string;
  status: string;
  type: string;
  image: string;
  color: string;
  sequence: string;
  merchant_id: string;
  valid_days: string;
  start_at: any;
  end_at: any;
  event_date: any;
  created_at: string;
  updated_at: string;
  links: Links;
}

export interface Category {
  id: string;
  name: string;
  category_image: string;
  descriptions: string;
}

export interface Links {
  self: string;
}
