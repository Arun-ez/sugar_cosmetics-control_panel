
import { RiRefreshLine } from 'react-icons/ri';
import { PiCaretLeftThin, PiCaretRightThin } from 'react-icons/pi';
import { Flex, Input, Select, Text } from '@chakra-ui/react'



const TableNavigator = ({ page, set_page, total_pages, selections, selected, set_selected, query, set_query, items, load, search_placeholder, children }) => {

    const previous_page = (prev) => {

        if (prev > 1) {
            return prev - 1;
        }

        return prev;
    }

    const next_page = (prev) => {

        if (prev < total_pages) {
            return prev + 1;
        }

        return prev;
    }

    return (
        <Flex w={'100%'} gap={10} px={4}>
            <Flex w={'100%'} justifyContent={'flex-start'} gap={5}>

                <Input
                    h={12}
                    w={300}
                    borderRadius={12}
                    borderColor={'rgba(255,255,255, 0.2)'}
                    _focusVisible={false}
                    value={query}
                    type='text'
                    placeholder={search_placeholder}
                    onChange={(event) => { set_query(event.target.value) }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            set_page(1);
                            load();
                        }
                    }}
                />

                {selections && (
                    <Select
                        h={12}
                        w={300}
                        borderRadius={12}
                        _focusVisible={false}
                        borderColor={'rgba(255,255,255, 0.2)'}
                        value={selected}
                        onChange={(event) => {
                            set_page(1);
                            set_selected(event.target.value)
                        }}

                        disabled={query}
                    >

                        {selections.map(({ label, value }, idx) => {
                            return (
                                <option value={value} key={idx} style={{ color: 'black' }} > {label} </option>
                            )
                        })}

                    </Select>
                )}


            </Flex>


            <Flex w={'100%'} justifyContent={'flex-end'} alignItems={'center'} gap={10} whiteSpace={'nowrap'} >

                <Flex justifyContent={'center'} alignItems={'center'} gap={8}>
                    <Flex
                        userSelect={'none'}
                        cursor={'pointer'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={1}
                        onClick={() => { set_page(previous_page) }}
                    >
                        <PiCaretLeftThin /> Prev
                    </Flex>

                    <Text>
                        {page} / {total_pages}
                    </Text>

                    <Flex
                        userSelect={'none'}
                        cursor={'pointer'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        gap={1}
                        onClick={() => { set_page(next_page) }}

                    >
                        Next <PiCaretRightThin />
                    </Flex>
                </Flex>

                <Flex
                    fontSize={22}
                    color={'gray.500'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    whiteSpace={'nowrap'}
                    fontWeight={'medium'}
                >
                    {items} Items
                </Flex>

                {children}

                <RiRefreshLine fontSize={25} cursor={'pointer'} onClick={load} />
            </Flex>


        </Flex>
    )
}

export { TableNavigator }
