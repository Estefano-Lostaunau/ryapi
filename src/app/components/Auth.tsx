import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import UserService from '../domains/user/UserService';

const Auth = () => {
  const handleLoginSuccess = async (response) => {
    await UserService.loginWithGoogle(response.credential);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default Auth;