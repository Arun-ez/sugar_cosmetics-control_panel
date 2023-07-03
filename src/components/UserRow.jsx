import { Tr, Td, Button, useDisclosure } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { UserDrawer } from './UserDrawer';
import { Axios } from '@/configs/axios.config';
import { toast } from 'react-hot-toast';


const UserRow = ({ data, load, token }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { _id, name, email, date, addresses, cart } = data;

    const parseTimezone = (timezone) => {
        const date = timezone.substr(0, 10).split('-').reverse().join('-');
        return date;
    }

    const delete_user = async () => {
        try {
            await Axios.delete(`/users/${_id}?token=${token}`)
            toast.success('User has been removed');
            load();
        } catch (error) {
            toast.error('Failed to remove user');
        }
    }

    return (
        <Tr whiteSpace={'nowrap'}>
            <Td> {name} </Td>
            <Td> {email} </Td>
            <Td> {addresses[0]?.number || 'Not Provided'} </Td>
            <Td> {addresses[0]?.city || 'Not Provided'} </Td>
            <Td> {addresses[0]?.pincode || 'Not Provided'} </Td>
            <Td> {parseTimezone(date)} </Td>
            <Td textAlign={'center'} > {cart.length} </Td>
            <Td>
                <Button w={100} bg={'gray.600'} color={'white'} _hover={'none'} onClick={onOpen} > View More </Button>
                <UserDrawer isOpen={isOpen} onClose={onClose} data={data} />
            </Td>
            <Td> <MdDelete color={'#E53E3E'} fontSize={22} cursor={'pointer'} onClick={delete_user} /> </Td>
        </Tr>
    )
}

export { UserRow }
