import axios from 'axios';
import { useQuery } from 'react-query';

import { KEY_PRODUCT, KEY_PRODUCT_LIST, ProductTable } from './datas';

export const useProductList = () => {
  return useQuery([KEY_PRODUCT_LIST], async () => {
    const url = '/product';
    const { data } = await axios.get<{ products: ProductTable[] }>(url);
    return data;
  });
};

export const useProduct = (id: number) => {
  return useQuery(
    [KEY_PRODUCT],
    async () => {
      const url = `/product/${id}`;
      const { data } = await axios.get<{ product: ProductTable }>(url);
      return data;
    },
    {
      enabled: false
    }
  );
};
