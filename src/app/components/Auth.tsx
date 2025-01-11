import { useNavigate } from 'react-router-dom';
import {GoogleLogin, CredentialResponse, googleLogout } from '@react-oauth/google';
import UserService from '../domains/user/UserService';
import { useUser } from '../contexts/UserContext';
import {jwtDecode } from 'jwt-decode';

const Auth = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    console.log('Login response:', response); // Agrega esto
    if (response.credential) {
      console.log('credencial:', jwtDecode(response.credential)); // Agrega esto
    } else {
      console.error('No credential found in response');
    }
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
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        auto_select={true}
      />
      
  );
};

export default Auth;