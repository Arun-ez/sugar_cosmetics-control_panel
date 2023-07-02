import { Axios } from "@/configs/axios.config";
import { Input, Button, VStack, Flex, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = ({ onAuthSuccess }) => {

    const [loading, set_loading] = useState(false);
    const [username, set_username] = useState('');
    const [password, set_password] = useState('');

    const login = async () => {

        set_loading(true);

        const { data } = await Axios.post('/auth/login', { username, password })

        set_loading(false);

        if (data.error) {
            toast.error('Invalid Credentials');
            return;
        }

        onAuthSuccess(data.name, data.token);
        localStorage.setItem('sc_token', data.token);
        toast.success('Login Successful');

    }

    return (
        <Flex direction={'column'} alignItems={'center'} >
            <Image src={'/logo.png'} h={20} mt={20} />
            <VStack w={400} gap={4} mt={100} >
                <Heading mb={10} fontWeight={'medium'} > Welcome Back! </Heading>
                <Input
                    value={username}
                    type="text"
                    placeholder="User ID"
                    h={14}
                    borderRadius={12}
                    borderColor={'rgba(255,255,255, 0.2)'}
                    onChange={({ target: { value } }) => set_username(value)}
                />

                <Input
                    value={password}
                    type="text"
                    placeholder="Password"
                    h={14}
                    borderRadius={12}
                    borderColor={'rgba(255,255,255, 0.2)'}
                    onChange={({ target: { value } }) => set_password(value)}
                />

                <Button
                    w={400} h={14}
                    borderRadius={12}
                    fontSize={20}
                    isLoading={loading}
                    onClick={login}
                >
                    Sign In
                </Button>
            </VStack>
        </Flex>
    )
}

export { Login };
