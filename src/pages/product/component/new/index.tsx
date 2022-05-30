import { FormEvent } from 'react';

import { Box, Button, FormControl, Paper, TextField } from '@mui/material';
import { Product } from '../../../../models';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NewForm = () => {
  const navigate = useNavigate();
  const createProduct = Product.Mutation.useCreateProduct();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = {
      name: data.get('name') as string,
      sku: data.get('sku') as string,
      upc: data.get('upc') as string
    };

    createProduct.mutate(
      { ...params },
      {
        onSuccess: () => {
          toast.success('제품을 저장했습니다.');
          navigate('/product');
        },
        onError: (error) => {
          console.log('post Error::', error);
          toast.error('제품 저장 실패');
        }
      }
    );
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
