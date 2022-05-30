import axios from 'axios';
import { useMutation } from 'react-query';
import { Product } from './datas';

export const useCreateProduct = () => {
  return useMutation(async (params: Product) => {
    const url = `/product`;
    const { data } = await axios.post<Product>(url, params);

    return data;
  });
};
