import { StatusBar } from 'expo-status-bar';
import { useAuthContext } from '../context/AuthContext';
import SignIn from './(auth)/sign-in';
import Home from './home';

export default function App() {
  const { authState } = useAuthContext();

  return (
    <>
      {
        authState.autenticated ?
          <Home></Home> :
          <SignIn></SignIn>
      }
      <StatusBar backgroundColor='#455E1C' />
    </>
  );
}
