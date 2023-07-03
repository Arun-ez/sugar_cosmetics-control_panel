import { useEffect, useState } from "react";
import { Flex, Box, Heading, Table, Thead, Tbody, Tr, Th, Spinner } from "@chakra-ui/react";
import { TableNavigator } from "@/components/TableNavigator";
import { OrderRow } from "@/components/OrderRow";
import { Axios } from "@/configs/axios.config";

const orders = ({ token }) => {

    const [orders, set_orders] = useState([]);
    const [total_items, set_total_items] = useState(0);
    const [loading, set_loading] = useState(false);

    const [selected, set_selected] = useState('active');
    const [query, set_query] = useState('');

    const [page, set_page] = useState(1);
    const [total_pages, set_total_pages] = useState(1);

    const selections = [
        { label: 'Active', value: 'active' },
        { label: 'Successful', value: 'successful' },
    ]

    const load = async () => {

        set_loading(true);

        try {
            const { data: { data, total_pages, count } } = await Axios.get(`/orders?limit=10&page=${page}&status=${selected}&q=${query}&token=${token}`);

            set_orders(data);
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
    }, [page, selected])

    return (
        <Box alignItems={'center'} w={'100%'} py={4} overflowX={'auto'}>
            <Heading textAlign={'center'} mb={6} > Orders </Heading>
            <TableNavigator
                page={page}
                set_page={set_page}
                total_pages={total_pages}
                query={query}
                set_query={set_query}
                items={total_items}
                load={load}
                token={token}
                search_placeholder={'Search By Order ID or Email'}
                selections={selections}
                selected={selected}
                set_selected={set_selected}
            />

            {!loading ? (
                <Table mt={5} variant={'simple'} whiteSpace={'nowrap'}>
                    <Thead>
                        <Tr>
                            <Th> Order ID </Th>
                            <Th> Ordered On </Th>
                            <Th> Name </Th>
                            <Th> Email </Th>
                            <Th> Contact </Th>
                            <Th> Pincode </Th>
                            <Th> No of Items </Th>
                            <Th> Amount </Th>
                            <Th> Status </Th>
                            <Th> View More </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {orders.map((user, idx) => {
                            return (
                                <OrderRow data={user} load={load} key={idx} token={token} />
                            )
                        })}
                    </Tbody>

                </Table>
            ) : (
                <Flex justifyContent={'center'} w={'100%'}>
                    <Spinner mt={140} size={'lg'} />
                </Flex>
            )}

        </Box>
    )
}

export default orders;
