import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Auth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('token');

        if (!token) {
          router.replace('/Login'); // Redirect to the login page if the token is missing
        }
      };

      checkAuth();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default Auth;
