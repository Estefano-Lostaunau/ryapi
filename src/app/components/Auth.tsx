import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import UserService from '../domains/user/UserService';
import { useUser } from '../contexts/UserContext';

const Auth = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    console.log('Login response:', response); // Agrega esto
    if (response.credential) {
      try {
        const userData = await UserService.loginWithGoogle(response.credential);
        setUser(userData);
        console.log('Login successful');
        navigate('/home');
      } catch (error) {
        console.error('Error during login with Google:', error);
      }
    } else {
      console.error('No credential found in response');
    }
  };
  

  const handleLoginFailure = () => {
    console.error('Login failed');
  };
  return (
    <GoogleOAuthProvider clientId="182560334827-a483crbq7b6bm97cv4n1smbe7tnkijmo.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default Auth;