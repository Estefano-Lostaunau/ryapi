import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import UserService from '../domains/user/UserService';

const Auth = () => {
  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      await UserService.loginWithGoogle(response.credential);
    } else {
      console.error('No credential found in response');
    }
  };

  const handleLoginFailure = () => {
    console.error('Login failed');
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