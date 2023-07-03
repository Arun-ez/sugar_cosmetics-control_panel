import {
    Text,
    Image,
    HStack,
    VStack,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';

import { OrderStepper } from './OrderStepper';
import { useState } from 'react';
import { CheckCircleIcon, CalendarIcon } from '@chakra-ui/icons';

import { Axios } from '@/configs/axios.config';
import { toast } from 'react-hot-toast';


const OrderDrawer = ({ isOpen, onClose, data, load, token }) => {

    const [loading, set_loading] = useState(false);

    const { _id, order_id, ordered_on, delivered_on, products, address, status, amount } = data;

    const status_steps = [
        { title: 'Proceed Shipping', value: 1 },
        { title: 'Proceed Delivery', value: 2 },
        { title: 'Mark As Delivered', value: 3 },
    ]

    const getDate = () => {
        const timezone = new Date();
        const day = timezone.getDate().toString().padStart(2, '0');
        const month = (timezone.getMonth() + 1).toString().padStart(2, '0');
        const year = timezone.getFullYear()

        return `${day}-${month}-${year}`;
    }

    const update_order_status = async () => {

        const data = status < 2 ? { status: status_steps[status].value } : { status: status_steps[status].value, delivered_on: getDate() }

        set_loading(true);

        try {
            await Axios.patch(`/orders/${_id}?token=${token}`, data)
            load();
            set_loading(false);
            toast.success('Success');
        } catch (error) {
            set_loading(false);
            toast.error('Failed');
        }
    }

    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement={'right'} size={'lg'} >
            <DrawerOverlay />
            <DrawerContent bg={'gray.800'} py={6} >
                <DrawerCloseButton />

                <DrawerHeader display={'flex'} flexDirection={'column'} justifyContent={'center'} fontSize={25} >

                    <HStack>
                        <Text> Order ID : </Text>
                        <Text color={'gray.300'} > #{order_id} </Text>
                    </HStack>

                    <Text color={'gray.300'} fontSize={16} >  Ordered On : {ordered_on} </Text>

                </DrawerHeader>

                <DrawerBody pt={2} >

                    <OrderStepper active={status === 3 ? status + 1 : status} />

                    <Text p={2} fontSize={22} > Address </Text>
                    <VStack
                        p={4}
                        w={'100%'}
                        alignItems={'flex-start'}
                        bg={'gray.700'}
                        borderRadius={15}
                    >
                        <Text> Contact : {address.number} </Text>
                        <Text> {address.flatno}, {address.locality} </Text>
                        <Text> {address.city} {address.pincode} </Text>
                        <Text> {address.state} </Text>
                    </VStack>

                    <Text p={2} mt={4} fontSize={22} > Products </Text>

                    <VStack>
                        {products.map(({ title, price, images, qty }, idx) => {

                            return (
                                <HStack
                                    p={4}
                                    key={idx} w={'100%'}
                                    justifyContent={'space-between'}
                                    alignItems={'flex-start'}
                                    bg={'gray.700'}
                                    borderRadius={15}
                                >
                                    <HStack gap={5}>
                                        <Image src={images[0]} h={14} w={10} />

                                        <VStack alignItems={'flex-start'}>
                                            <Text fontSize={16}> {title} </Text>
                                            <Text color={'gray.300'}> ₹ {price} </Text>
                                        </VStack>
                                    </HStack>

                                    <HStack>
                                        <Text color={'gray.300'}> Qty : {qty} </Text>
                                    </HStack>

                                </HStack>
                            )
                        })}

                    </VStack>

                </DrawerBody>

                <DrawerFooter>
                    {(status < 3) ? (
                        <HStack w={'100%'} justifyContent={'space-between'} >
                            <Text fontSize={22} > Total Rs. {amount}/-  </Text>
                            <Button onClick={update_order_status} isLoading={loading} > {status_steps[status].title} </Button>
                        </HStack>

                    ) : (
                        <HStack w={'100%'} justifyContent={'space-between'} >
                            <Text fontSize={22} > Total Rs. {amount}/-  </Text>
                            <HStack justifyContent={'flex-end'} gap={6} >
                                <HStack> <CheckCircleIcon color={'green.300'} /> <Text> Delivered </Text> </HStack>
                                <HStack> <CalendarIcon color={'blue.300'} /> <Text> {delivered_on}  </Text> </HStack>
                            </HStack>
                        </HStack>

                    )}

                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}

export { OrderDrawer }
