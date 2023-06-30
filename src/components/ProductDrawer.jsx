
import {
    Box,
    Flex,
    Text,
    Image,
    Input,
    Select,
    Button,
    HStack,
    Drawer,
    SimpleGrid,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { Axios } from '@/configs/axios.config';

const ProductDrawer = ({ isOpen, onClose, data, load, type }) => {

    const input_parent_ref = useRef(null);

    const [loading, set_loading] = useState(false);

    const { _id, title, images, description, price, category, filter, inventory, discount, source } = data || {
        _id: null,
        title: '',
        images: ['', '', '', '', ''],
        description: '',
        price: '',
        category: '',
        filter: '',
        inventory: '',
        discount: '',
        source: ''
    };

    const selections = [
        { label: 'Select Category', value: '' },
        { label: 'Lips', value: 'lips' },
        { label: 'Eyes', value: 'eyes' },
        { label: 'Face', value: 'face' },
        { label: 'Nails', value: 'nails' },
        { label: 'Skincare', value: 'skincare' },
        { label: 'Accessories', value: 'accessories' },
        { label: 'Gift & Kits', value: 'kit' },
        { label: 'Best Sellers', value: 'seller' },
        { label: 'New Launches', value: 'new' },
    ]

    const post_data = () => {

    }

    const update_data = async () => {

        const {
            title,
            desc,
            price,
            category,
            filter,
            inventory,
            discount,
            source,
            image_1,
            image_2,
            image_3,
            image_4,
            image_5
        } = input_parent_ref.current;

        const data = {
            title: title.value,
            description: desc.value,
            price: Number(price.value),
            category: category.value,
            filter: filter.value,
            inventory: Number(inventory.value),
            discount: Number(discount.value),
            source: source.value,
            images: [image_1.value, image_2.value, image_3.value, image_4.value, image_5.value]
        }

        set_loading(true);

        let response = await Axios.patch(`/products/${_id}`, data);

        set_loading(false);

        if (response.status === 200) {
            load();
            onClose();
        }
    }

    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement={'top'} >
            <DrawerOverlay />
            <DrawerContent bg={'gray.800'} py={6} >
                <DrawerCloseButton />
                <DrawerHeader>{type === 'update' ? title : 'Add New Product'}</DrawerHeader>
                <DrawerBody >
                    <Flex gap={10}>

                        {(type === 'update') && (
                            <SimpleGrid columns={2} gap={4}>
                                {images.map((src, idx) => {

                                    return (
                                        <Image src={src} w={'200px'} h={'210px'} key={idx} />
                                    )

                                })}
                            </SimpleGrid>
                        )}


                        <Box w={'100%'} >
                            <form w={'100%'} ref={input_parent_ref}  >
                                <Box w={'100%'} >
                                    <SimpleGrid columns={[1, 2, 2, 3]} gap={4} w={'100%'}>


                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Title </Text>
                                            <Input
                                                name="title"
                                                defaultValue={title}
                                                h={12}
                                                placeholder={'title'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Description </Text>
                                            <Input
                                                name="desc"
                                                defaultValue={description}
                                                h={12}
                                                placeholder={'Description'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Price </Text>
                                            <Input
                                                name="price"
                                                defaultValue={price}
                                                type='number'
                                                h={12}
                                                placeholder={'Price'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                                onChange={(event) => set_details((prev) => { return { ...prev, price: event.target.value } })}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Category </Text>

                                            <Select
                                                name="category"
                                                h={12}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                                defaultValue={category}
                                            >
                                                {selections.map(({ label, value }, idx) => {
                                                    return (
                                                        <option value={value} key={idx} style={{ color: 'black' }} > {label} </option>
                                                    )
                                                })}
                                            </Select>
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Filter By </Text>
                                            <Input
                                                name="filter"
                                                defaultValue={filter}
                                                h={12}
                                                placeholder={'Filter'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Inventory </Text>
                                            <Input
                                                name="inventory"
                                                defaultValue={inventory}
                                                h={12}
                                                placeholder={'Inventory'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Discount </Text>
                                            <Input
                                                name="discount"
                                                defaultValue={discount}
                                                type='number'
                                                h={12}
                                                placeholder={'Discount'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                        <Box>
                                            <Text fontWeight={'medium'} mb={1} fontSize={18} pl={1} letterSpacing={1}> Source </Text>
                                            <Input
                                                name="source"
                                                defaultValue={source}
                                                type='url'
                                                h={12}
                                                placeholder={'Source'}
                                                borderRadius={12}
                                                borderColor={'rgba(255,255,255, 0.2)'}
                                            />
                                        </Box>

                                    </SimpleGrid>

                                    <Text fontWeight={'medium'} mb={1} fontSize={22} pl={1} letterSpacing={1} mt={10} > Image Sources </Text>

                                    <SimpleGrid mt={2} columns={[1, 2, 2, 3]} gap={4} w={'100%'}>

                                        {images.map((src, idx) => {
                                            return (
                                                <Box key={idx}>
                                                    <Input
                                                        name={`image_${idx + 1}`}
                                                        defaultValue={src}
                                                        tyep='url'
                                                        h={12}
                                                        placeholder={'Image Source'}
                                                        borderRadius={12}
                                                        borderColor={'rgba(255,255,255, 0.2)'}
                                                    />
                                                </Box>
                                            )
                                        })}


                                    </SimpleGrid>
                                </Box>

                            </form>

                        </Box>

                    </Flex>

                    <DrawerFooter>
                        <HStack gap={4} mt={10}>

                            {type === 'update' && (
                                <Button w={200} bg={'gray.600'} color={'white'} _hover={'none'}>
                                    <Link href={source} target='_blank'> Source </Link>
                                </Button>
                            )}

                            {type === 'update' ? (
                                <Button
                                    isLoading={loading}
                                    w={200} bg={'gray.600'}
                                    color={'white'} _hover={'none'}
                                    onClick={update_data}
                                >
                                    Update
                                </Button>
                            ) : (
                                <Button
                                    isLoading={loading}
                                    w={200} bg={'gray.600'}
                                    color={'white'} _hover={'none'}
                                    onClick={post_data}
                                >
                                    Post
                                </Button>
                            )}


                        </HStack>

                    </DrawerFooter>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export { ProductDrawer }
