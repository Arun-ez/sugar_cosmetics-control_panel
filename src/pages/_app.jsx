import '@/styles/globals.css'
import Head from 'next/head';
import axios from 'axios';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Sidebar } from '@/components/Sidebar';
import { Login } from '@/components/Login';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Axios } from '@/configs/axios.config';

const App = ({ Component, pageProps }) => {

  const [isAuth, setAuth] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);

  const onAuthSuccess = (name, token) => {
    setAuth(true);
    setAdmin(name);
    setToken(token);
  }

  const onLogout = () => {
    setAuth(false);
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('sc_token');
  }

  const checkAuthSession = async () => {
    const token = localStorage.getItem('sc_token');

    if (!token) return;

    const { data } = await Axios.post(`/auth/login?token=${token}`);
    if (data.error) return;
    onAuthSuccess(data.name, token);
  }

  useEffect(() => {
    checkAuthSession();
  }, [])

  return (
    <>
      <Head>
        <title> Sugar Cosmetics - Control Panel </title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <meta name="description" content="sugar cosmetics control panel" />
      </Head>

      <ChakraProvider>

        {isAuth ?
          (
            <Flex minH={'100vh'}>
              <Sidebar admin={admin} onLogout={onLogout} />
              <Component {...pageProps} token={token} />
            </Flex>
          ) : (
            <Login onAuthSuccess={onAuthSuccess} />
          )
        }

      </ChakraProvider>

      <Toaster
        toastOptions={{
          style: {
            color: 'white',
            backgroundColor: '#2D3748',
            backdropFilter: 'blur(20px)'
          }
        }}
      />
    </>
  )

}


export default App;