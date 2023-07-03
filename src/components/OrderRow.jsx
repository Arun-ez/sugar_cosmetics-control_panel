import { Tr, Td, Button, useDisclosure } from '@chakra-ui/react';
import { OrderDrawer } from './OrderDrawer';

import { Axios } from '@/configs/axios.config';
import { toast } from 'react-hot-toast';


const OrderRow = ({ data, load, token }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { order_id, ordered_on, name, email, address, products, amount, status } = data;

    const status_list = [
        { name: 'Confirmed', color: '#4299E1' },
        { name: 'Shipped', color: '#9F7AEA' },
        { name: 'In Transit', color: '#ECC94B' },
        { name: 'Delivered', color: '#68D391' }
    ]

    return (
        <Tr whiteSpace={'nowrap'}>
            <Td> {order_id} </Td>
            <Td> {ordered_on} </Td>
            <Td> {name} </Td>
            <Td> {email} </Td>
            <Td> {address.number} </Td>
            <Td> {address.pincode} </Td>
            <Td textAlign={'center'} > {products.length} </Td>
            <Td> ₹ {amount} </Td>
            <Td color={status_list[status].color} fontWeight={500} > {status_list[status].name} </Td>
            <Td>
                <Button w={100} bg={'gray.600'} color={'white'} _hover={'none'} onClick={onOpen} > View More </Button>
                <OrderDrawer isOpen={isOpen} onClose={onClose} data={data} load={load} token={token} />
            </Td>
        </Tr>
    )
}

export { OrderRow }
