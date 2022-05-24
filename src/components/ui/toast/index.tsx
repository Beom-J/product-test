import { useEffect } from 'react';
import { Toaster, useToasterStore, toast } from 'react-hot-toast';

function Toast() {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts.forEach((t, idx) => {
      if (idx > 0) toast.remove(t.id);
    });
  }, [toasts]);

  return (
    <Toaster
      position="bottom-center"
      containerStyle={{
        left: '50%',
        bottom: '0',
        top: 'none',
        right: 'none',
        transform: 'translate(-50%, -60px)',
        width: '100%'
      }}
      toastOptions={{
        duration: 1000,
        style: {
          background: 'rgba(0, 0, 0, 0.75)',
          color: '#fff'
        },
        success: { duration: 1000 }
      }}
    />
  );
}

export default Toast;
