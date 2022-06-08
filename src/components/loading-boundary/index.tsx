import { CircularProgress } from '@mui/material';
import { ReactNode, Suspense } from 'react';

type Props = {
  children: ReactNode;
};

function LoadingBoundary({ children }: Props) {
  return <Suspense fallback={<LoadingCircle />}>{children}</Suspense>;
}

export function LoadingCircle() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <CircularProgress size={50} />
    </div>
  );
}

export default LoadingBoundary;
