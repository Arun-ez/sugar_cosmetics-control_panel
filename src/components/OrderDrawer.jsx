import {
    Text,
    Image,
    HStack,
    VStack,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerFooter,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';


const OrderDrawer = ({ isOpen, onClose, data, laod, token }) => {



    return (
        <Drawer onClose={onClose} isOpen={isOpen} placement={'right'} size={'lg'} >
            <DrawerOverlay />
            <DrawerContent bg={'gray.800'} py={6} >
                <DrawerCloseButton />

                <DrawerHeader display={'flex'} flexDirection={'column'} alignItems={'center'}>

                </DrawerHeader>

                <DrawerBody pt={10} >

                </DrawerBody>

                <DrawerFooter>

                </DrawerFooter>

            </DrawerContent>
        </Drawer>
    )
}

export { OrderDrawer }
