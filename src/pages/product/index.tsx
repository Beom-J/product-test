import { Box } from '@mui/material';
import { useProductList } from '../../models/product/queries';

const Product = () => {
  const { data } = useProductList();

  return (
    <div>
      <h1>product</h1>
      {data &&
        data.products.map((product) => (
          <Box key={product.id}>
            <p>{product.name}</p>
            <p>{product.sku}</p>
            <p>{product.upc}</p>
          </Box>
        ))}
    </div>
  );
};

export default Product;
