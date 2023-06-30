import '@/styles/globals.css'
import Head from 'next/head';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { Sidebar } from '@/components/Sidebar';
import { Login } from '@/components/Login';
import { useState } from 'react';

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
    </>
  )

}


export default App;