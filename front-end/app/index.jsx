import { useAuthContext } from '../context/AuthContext';
import Home from './home';
import SignIn from './(auth)/sign-in';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const { authState } = useAuthContext();

  return (
    <PaperProvider>
      {authState.autenticated ?
        <Home></Home> :
        <SignIn></SignIn>}
    </PaperProvider>
  );
}
