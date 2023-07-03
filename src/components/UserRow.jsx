import { useState } from 'react';
import { Tr, Td, Button, useDisclosure } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { UserDrawer } from './UserDrawer';
import { ConsentAlert } from './ConsentAlert';
import { Axios } from '@/configs/axios.config';
import { toast } from 'react-hot-toast';

const UserRow = ({ data, load, token }) => {

    const consent = useDisclosure();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { _id, name, email, date, addresses, cart } = data;
    const [loading, set_loading] = useState(false);

    const parseTimezone = (timezone) => {
        const date = timezone.substr(0, 10).split('-').reverse().join('-');
        return date;
    }

    const delete_user = async () => {
        set_loading(true);
        try {
            await Axios.delete(`/users/${_id}?token=${token}`)
            toast.success('User has been removed');
            set_loading(false);
            load();
        } catch (error) {
            set_loading(false);
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

            <Td>
                <MdDelete color={'#E53E3E'} fontSize={22} cursor={'pointer'} onClick={consent.onOpen} />
                <ConsentAlert isOpen={consent.isOpen} onClose={consent.onClose} onLoading={loading} onProceed={delete_user} > Delete User </ConsentAlert>
            </Td>
        </Tr>
    )
}

export { UserRow }
