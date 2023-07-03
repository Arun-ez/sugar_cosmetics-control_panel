import {
    Text,
    Image,
    HStack,
    VStack,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';


const UserDrawer = ({ isOpen, onClose, data }) => {

    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement={'right'} size={'lg'} >
            <DrawerOverlay />
            <DrawerContent bg={'gray.800'} py={6} >
                <DrawerCloseButton />
                <DrawerHeader display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <Image src={'/user.svg'} h={32} />
                    <Text fontSize={25} > {data.name} </Text>
                    <Text fontWeight={'normal'} fontSize={16} color={'gray.300'} > {data.email} </Text>
                </DrawerHeader>
                <DrawerBody pt={10} >

                    <Text fontWeight={500} fontSize={20} pl={2} > Addresses </Text>
                    <VStack py={4}>
                        {data.addresses.length ? (

                            data.addresses.map(({ number, flatno, locality, city, pincode, state }, idx) => {

                                return (
                                    <VStack
                                        p={4}
                                        key={idx} w={'100%'}
                                        alignItems={'flex-start'}
                                        bg={'gray.700'}
                                        borderRadius={15}
                                    >
                                        <Text> Contact : {number} </Text>
                                        <Text> {flatno}, {locality} </Text>
                                        <Text> {city} {pincode} </Text>
                                        <Text> {state} </Text>
                                    </VStack>
                                )
                            })


                        ) : (
                            <Text color={'gray.500'} > Not Provided! </Text>
                        )}

                    </VStack>

                    <Text fontWeight={500} fontSize={20} pl={2} > Cart </Text>
                    <VStack py={4}>

                        {data.cart.length ? (

                            data.cart.map(({ title, price, images }, idx) => {

                                return (
                                    <HStack
                                        p={4} gap={5}
                                        key={idx} w={'100%'}
                                        justifyContent={'flex-start'}
                                        bg={'gray.700'}
                                        borderRadius={15}
                                    >
                                        <Image src={images[0]} h={14} w={10} />

                                        <VStack alignItems={'flex-start'}>
                                            <Text fontSize={16}> {title} </Text>
                                            <Text color={'gray.300'}> ₹ {price} </Text>
                                        </VStack>
                                    </HStack>
                                )
                            })


                        ) : (
                            <Text color={'gray.500'} mt={8} > Cart is empty! </Text>
                        )}

                    </VStack>

                    <Text fontWeight={500} fontSize={20} pl={2} > Wishlist </Text>
                    <VStack py={4}>

                        {data.wishlist.length ? (

                            data.wishlist.map(({ title, price, images }, idx) => {

                                return (
                                    <HStack
                                        p={4} gap={5}
                                        key={idx} w={'100%'}
                                        justifyContent={'flex-start'}
                                        bg={'gray.700'}
                                        borderRadius={15}
                                    >
                                        <Image src={images[0]} h={14} w={10} />

                                        <VStack alignItems={'flex-start'}>
                                            <Text fontSize={16}> {title} </Text>
                                            <Text color={'gray.300'}> ₹ {price} </Text>
                                        </VStack>
                                    </HStack>
                                )
                            })


                        ) : (
                            <Text color={'gray.500'} mt={8} > Wishlist is empty! </Text>
                        )}

                    </VStack>

                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export { UserDrawer }
