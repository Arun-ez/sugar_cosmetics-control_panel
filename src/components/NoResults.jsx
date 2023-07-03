import { VStack, Heading } from "@chakra-ui/react";
import { WarningIcon } from '@chakra-ui/icons';

const NoResults = () => {
    return (
        <VStack mt={'20vh'}>
            <WarningIcon fontSize={30} color={'yellow.200'} />
            <Heading fontWeight={'medium'} > No Records </Heading>
        </VStack>
    )
}

export { NoResults }
