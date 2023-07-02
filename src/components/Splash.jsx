import { VStack, Image, Text, Spinner } from '@chakra-ui/react';

const Splash = () => {
    return (
        <VStack h={'100vh'} >
            <Image src='/logo.png' h={[70, 82, 100, 100]} mt={280} />
            <Spinner size={'lg'} mt={4} />
        </VStack>
    )
}

export { Splash }
