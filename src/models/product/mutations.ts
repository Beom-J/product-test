import axios from 'axios';
import { useMutation } from 'react-query';
import { Product, ProductTable } from './datas';

export const useCreateProduct = () => {
  return useMutation(async (params: Product) => {
    const url = `/product`;
    const { data } = await axios.post<ProductTable>(url, params);

    return data;
  });
};

export const useUpdateProduct = () => {
  return useMutation(
    async ({ id, params }: { id: number; params: Product }) => {
      const url = `/product/${id}`;
      const { data } = await axios.patch<ProductTable>(url, params);

      return data;
    }
  );
};

export const useDeleteProduct = () => {
  return useMutation(async (id: number) => {
    const url = `/product/${id}`;
    await axios.delete(url);
  });
};
