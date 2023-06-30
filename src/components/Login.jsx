import { Input, Button, VStack, Flex, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {

    const [loading, set_loading] = useState(false);

    const login = async () => {
        //set_loading(true);

    }

    return (
        <Flex direction={'column'} alignItems={'center'} >
            <Image src={'/logo.png'} h={20} mt={20} />
            <VStack w={400} gap={4} mt={100} >
                <Heading mb={10} fontWeight={'medium'} > Welcome Back! </Heading>
                <Input type="text" placeholder="User ID" h={14} borderRadius={12} borderColor={'rgba(255,255,255, 0.2)'} />
                <Input type="text" placeholder="Password" h={14} borderRadius={12} borderColor={'rgba(255,255,255, 0.2)'} />
                <Button w={400} h={14} borderRadius={12} fontSize={20} isLoading={loading} onClick={login}  > Sign In </Button>
            </VStack>
        </Flex>
    )
}

export { Login };
