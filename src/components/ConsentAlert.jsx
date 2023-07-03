import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

const ConsentAlert = ({ children, isOpen, onClose, onProceed, onLoading }) => {

    return (
        <AlertDialog
            motionPreset='slideInBottom'
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent bg={'gray.800'}>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'> {children} </AlertDialogHeader>

                    <AlertDialogBody> Are you sure? You can't undo this action afterwards. </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button bg={'gray.600'} color={'white'} _hover={'none'} onClick={onClose}> Cancel </Button>
                        <Button isLoading={onLoading} onClick={onProceed} ml={3}> Delete </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export { ConsentAlert }
