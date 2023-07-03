import { useEffect, useState } from "react";
import { Flex, Box, Heading, Table, Thead, Tbody, Tr, Th, Spinner } from "@chakra-ui/react";
import { TableNavigator } from "@/components/TableNavigator";
import { UserRow } from "@/components/UserRow";
import { NoResults } from "@/components/NoResults";
import { Axios } from "@/configs/axios.config";

const users = ({ token }) => {

    const [users, set_users] = useState([]);
    const [total_items, set_total_items] = useState(0);
    const [loading, set_loading] = useState(false);

    const [query, set_query] = useState('');

    const [page, set_page] = useState(1);
    const [total_pages, set_total_pages] = useState(1);

    const load = async () => {

        set_loading(true);

        try {
            const { data: { data, total_pages, count } } = await Axios.get(`/users?limit=10&page=${page}&email=${query}&token=${token}`);

            set_users(data);
            set_total_items(count);
            set_total_pages(total_pages);
            set_loading(false);
        } catch (error) {
            set_loading(false);
        }
    }

    useEffect(() => {
        if (!query) {
            load();
        }
    }, [query])

    useEffect(() => {
        load();
    }, [page])

    return (
        <Box alignItems={'center'} w={'100%'} py={4} overflowX={'auto'}>
            <Heading textAlign={'center'} mb={6} > Users </Heading>
            <TableNavigator
                page={page}
                set_page={set_page}
                total_pages={total_pages}
                query={query}
                set_query={set_query}
                items={total_items}
                load={load}
                token={token}
                search_placeholder={'Search By Email'}
            />

            {!loading ? (

                users.length ? (

                    <Table mt={5} variant={'simple'} whiteSpace={'nowrap'}>
                        <Thead>
                            <Tr>
                                <Th> Name </Th>
                                <Th> Email </Th>
                                <Th> Contact </Th>
                                <Th> City </Th>
                                <Th> Pincode </Th>
                                <Th> Created On </Th>
                                <Th> Cart Items </Th>
                                <Th> View More </Th>
                                <Th> Delete </Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {users.map((user, idx) => {
                                return (
                                    <UserRow data={user} load={load} key={idx} token={token} />
                                )
                            })}
                        </Tbody>

                    </Table>
                ) : (
                    <NoResults />
                )
            ) : (
                <Flex justifyContent={'center'} w={'100%'}>
                    <Spinner mt={140} size={'lg'} />
                </Flex>
            )}

        </Box>
    )
}

export default users;
