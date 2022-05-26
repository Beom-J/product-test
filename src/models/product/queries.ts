import axios from 'axios';
import { useQuery } from 'react-query';

import { KEY_PRODUCT_LIST, Product } from './datas';

export const useProductList = () => {
  return useQuery([KEY_PRODUCT_LIST], async () => {
    const url = '/product';
    const { data } = await axios.get<{ products: Product[] }>(url);
    return data;
  });
};
