import Link from 'next/link';
import { Tr, Td, Switch, Button, useDisclosure } from '@chakra-ui/react';
import { ProductDrawer } from './ProductDrawer';
import { Axios } from '@/configs/axios.config';


const ProductRow = ({ data, load, token }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { _id, title, price, category, rating, inventory, discount, source, visibility } = data;

    const switch_onchange = async () => {

        let response = await Axios.patch(`/products/${_id}?token=${token}`, { visibility: !visibility });

        if (response.status === 200) {
            load();
        }
    }

    return (
        <Tr whiteSpace={'nowrap'} bg={inventory <= 0 ? 'red.600' : ''}>
            <Td> <Switch isChecked={visibility} onChange={switch_onchange} /> </Td>
            <Td w={600} minW={600} > {title} </Td>
            <Td> ₹ {price} </Td>
            <Td> {category} </Td>
            <Td> {rating} </Td>
            <Td> {inventory} </Td>
            <Td> {discount}% </Td>
            <Td>
                <Button w={100} bg={'gray.600'} color={'white'} _hover={'none'} >
                    <Link href={source} target='_blank' > Source </Link>
                </Button>
            </Td>
            <Td>
                <Button w={100} bg={'gray.600'} color={'white'} _hover={'none'} onClick={onOpen} > View More </Button>
                <ProductDrawer isOpen={isOpen} onClose={onClose} data={data} load={load} type='update' token={token} />
            </Td>
        </Tr>
    )
}

export { ProductRow }
