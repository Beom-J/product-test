import { Outlet } from 'react-router-dom';

const ProductHeader = () => {
  return (
    <div>
      <h1>product</h1>
      <Outlet />
    </div>
  );
};

export default ProductHeader;
