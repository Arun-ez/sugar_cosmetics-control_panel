import '@/styles/globals.css'
import Head from 'next/head';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Sidebar } from '@/components/Sidebar';
import { Login } from '@/components/Login';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }) => {

  const [isAuth, setAuth] = useState(true);

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
              <Sidebar />
              <Component {...pageProps} />
            </Flex>
          ) : (
            <Login />
          )
        }

      </ChakraProvider>

      <Toaster
        toastOptions={{
          style: { backgroundColor: "#2D3748", color: "white", backdropFilter: "blur(20px)" }
        }}
      />
    </>
  )

}


export default App;