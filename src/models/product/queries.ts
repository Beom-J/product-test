import axios from 'axios';
import { useQuery } from 'react-query';

import { KEY_PRODUCT_LIST, ProductTable } from './datas';

export const useProductList = () => {
  return useQuery([KEY_PRODUCT_LIST], async () => {
    const url = '/product';
    const { data } = await axios.get<{ products: ProductTable[] }>(url);
    return data;
  });
};
