export type Product = {
  name: string;
  sku: string;
  upc: string;
};

export type ProductTable = Product & BasicColumn;

export type BasicColumn = {
  id: number;
  created_at: string;
  updated_at: string;
};

export const KEY_PRODUCT_LIST = 'product_list';
