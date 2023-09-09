import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        // Check if a token is present in localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          router.replace('/Login'); // Redirect to login if there is no token
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default Auth;
