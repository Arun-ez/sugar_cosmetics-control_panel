import Link from 'next/link';
import { Tr, Td, Switch, Button, useDisclosure } from '@chakra-ui/react';
import { ProductDrawer } from './ProductDrawer';
import { Axios } from '@/configs/axios.config';
import { useEffect, useState } from 'react';


const ProductRow = ({ data, load, token }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { _id, title, price, category, rating, inventory, discount, source, visibility } = data;

    const [corrupted, set_corrupted] = useState(false);

    const switch_onchange = async () => {

        let response = await Axios.patch(`/products/${_id}?token=${token}`, { visibility: !visibility });

        if (response.status === 200) {
            load();
        }
    }

    const checkImageCorruptionStatus = () => {
        data.images.forEach((src) => {
            const image = new Image();
            image.src = src;
            image.onerror = () => {
                set_corrupted(true);
            }
        })
    }

    useEffect(() => {
        checkImageCorruptionStatus();
    }, [data])

    return (
        <Tr whiteSpace={'nowrap'} bg={inventory <= 0 ? 'red.600' : ''}>
            <Td> <Switch isChecked={visibility} onChange={switch_onchange} /> </Td>
            <Td w={600} minW={600} _after={corrupted && { content: '"fix"', backgroundColor: 'red', paddingLeft: 2, paddingRight: 2, borderRadius: '10px' }} > {title} </Td>
            <Td> ₹ {price} </Td>
            <Td> {category} </Td>
            <Td textAlign={'center'}> {rating} </Td>
            <Td textAlign={'center'}> {inventory} </Td>
            <Td textAlign={'center'}> {discount}% </Td>
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
