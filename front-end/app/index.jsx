import { useAuthContext } from '../context/AuthContext';
import Home from './home';
import SignUp from './(auth)/sign-up';

export default function App() {
  const { authState } = useAuthContext();

  return (authState.autenticated ?
    <Home></Home> :
    <SignUp></SignUp>
  );
}
