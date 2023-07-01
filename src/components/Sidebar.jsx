import Link from 'next/link';
import { useRouter } from 'next/router';

import { CiLogout } from 'react-icons/ci';
import { FiUserCheck } from 'react-icons/fi';
import { Flex, Text, VStack, Image } from '@chakra-ui/react';


const Sidebar = ({ admin, onLogout }) => {

    const router = useRouter();

    const menu = [
        { title: 'Products', path: '/' },
        { title: 'Orders', path: '/orders' },
        { title: 'Users', path: '/users' }
    ]

    const isActive = (path) => {
        if (router.pathname === path) {
            return true;
        }

        return false;
    }

    return (
        <Flex
            bg={'gray.900'}
            w={'250px'}
            minW={'250px'}
            borderRightRadius={15}
            display={'flex'}
            direction={'column'}
            px={6}
            gap={20}
        >
            <Image src='/logo.png' w={36} mt={10} />

            <VStack alignItems={'flex-start'} gap={4} w={'100%'}>

                {menu.map(({ title, path }, idx) => {
                    return (
                        <Text
                            borderRadius={12}
                            w={'100%'}
                            px={4}
                            py={2}
                            bgColor={isActive(path) ? 'gray.700' : ''}
                            key={idx}
                            fontWeight={'medium'}
                            fontSize={22}
                        >
                            <Link href={path}>
                                {title}
                            </Link>
                        </Text>
                    )
                })}

            </VStack>

            <VStack>
                <Text
                    px={4}
                    py={2}
                    gap={2}
                    display={'flex'}
                    alignItems={'center'}
                    borderRadius={12}
                    w={'100%'}

                    fontWeight={'medium'}
                    fontSize={18}
                >
                    <FiUserCheck />
                    {admin}
                </Text>

                <Text
                    px={4}
                    py={2}
                    gap={2}
                    cursor={'pointer'}
                    display={'flex'}
                    alignItems={'center'}
                    borderRadius={12}
                    w={'100%'}
                    fontWeight={'medium'}
                    fontSize={18}
                    onClick={onLogout}
                >
                    <CiLogout />
                    Logout
                </Text>
            </VStack>

        </Flex>
    )
}

export { Sidebar };
