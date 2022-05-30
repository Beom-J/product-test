import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, FormControl, Paper, TextField } from '@mui/material';
import { Product as Model } from '../../../../models';
import { queryString } from '../../../../utils';

type Product = Model.Data.Product;

const useProduct = Model.Query.useProduct;

const NewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const createProduct = Model.Mutation.useCreateProduct();
  const updateProduct = Model.Mutation.useUpdateProduct();

  const [inputData, setInputData] = useState<Product>({
    name: '',
    sku: '',
    upc: ''
  });

  const isEditPage = location.pathname.includes('edit');

  const { product_id: productId } = queryString.parse(location.search);
  const { refetch } = useProduct(Number(productId));

  useEffect(() => {
    if (isEditPage && productId) {
      refetch().then(({ data }) => {
        if (data?.product) {
          const inputValue = {
            name: data.product.name,
            sku: data.product.sku,
            upc: data.product.upc
          };
          setInputData(inputValue);
        }
      });
    }
  }, [isEditPage, productId, refetch]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const key = event.currentTarget.name as keyof Product;
    const value = event.currentTarget.value;

    setInputData({ ...inputData, [key]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const params = {
      name: data.get('name') as string,
      sku: data.get('sku') as string,
      upc: data.get('upc') as string
    };

    try {
      if (isEditPage) {
        await updateProduct.mutateAsync({
          id: Number(productId),
          params: { ...params }
        });
      } else {
        await createProduct.mutateAsync({
          ...params
        });
      }
      toast.success('제품을 저장했습니다.');
      navigate('/product');
    } catch (error) {
      toast.error('제품 저장을 실패했습니다.');
      console.log(error);
    }
  };

  return (
    <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <FormControl
          variant="outlined"
          required
          sx={{
            width: '60%',
            m: 1
          }}
        >
          <TextField
            id="product_name"
            name="name"
            label="제품명"
            value={inputData.name}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          required
          sx={{
            width: '60%',
            m: 1
          }}
        >
          <TextField
            id="product_sku"
            name="sku"
            label="SKU"
            value={inputData.sku}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <FormControl
          variant="outlined"
          required
          sx={{
            width: '60%',
            m: 1
          }}
        >
          <TextField
            id="product_upc"
            name="upc"
            label="UPC"
            value={inputData.upc}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, ml: 1 }}>
          SAVE
        </Button>
      </Paper>
    </Box>
  );
};

export default NewForm;
