import { useEffect, useState } from "react";
import { Box, Heading, Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import { TableNavigator } from "@/components/TableNavigator";
import { ProductRow } from "@/components/ProductRow";
import { Axios } from "@/configs/axios.config";

const home = () => {

  const [products, set_products] = useState([]);
  const [total_items, set_total_items] = useState(0);

  const [query, set_query] = useState('');
  const [selected, set_selected] = useState('');

  const [page, set_page] = useState(1);
  const [total_pages, set_total_pages] = useState(1);


  const selection_list = [
    { label: 'All', value: '' },
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

  const search = async () => {

    if (!query) return;

    const { data: { data, total_pages, count } } = await Axios.get(`/products/search?q=${query}&limit=10&page=${page}`);
    set_products(data);
    set_total_items(count);
    set_total_pages(total_pages);
  }

  const load = async () => {

    if (query) {
      search();
      return;
    }

    const { data: { data, total_pages, count } } = await Axios.get(`/products?limit=10&page=${page}&category=${selected}`);

    set_products(data);
    set_total_items(count);
    set_total_pages(total_pages);
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
      <Heading textAlign={'center'} mb={6} > Products </Heading>
      <TableNavigator
        page={page}
        set_page={set_page}
        total_pages={total_pages}
        selections={selection_list}
        selected={selected}
        set_selected={set_selected}
        query={query}
        set_query={set_query}
        items={total_items}
        search={search}
        load={load}
      />

      <Table mt={5} variant={'simple'}>
        <Thead>
          <Tr>
            <Th> Visibility </Th>
            <Th> Title </Th>
            <Th> Price </Th>
            <Th> Category </Th>
            <Th> Rating </Th>
            <Th> Stock </Th>
            <Th> Discount(%) </Th>
            <Th> Source </Th>
            <Th> View More </Th>
          </Tr>
        </Thead>

        <Tbody>
          {products.map((product, idx) => {
            return (
              <ProductRow data={product} load={load} key={idx} />
            )
          })}
        </Tbody>
      </Table>

    </Box>
  )
}

export default home;
