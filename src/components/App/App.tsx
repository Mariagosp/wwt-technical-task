import { Box, Flex, Spinner, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { FilterChoose } from '@api/types/Filter'

import { useFilters } from '@/hooks/useFilters'
import { ConfirmModal } from '@components/ConfirmModal'
import { FilterModal } from '@components/FilterModal'
import { MainPage } from '@components/MainPage'
import { fetchFilteredData } from '@utils/fetchfilteredData'

export const App = () => {
	const { data: filterData, isLoading } = useQuery<FilterChoose[]>({
		queryFn: () => fetchFilteredData(),
		queryKey: ['filterData']
	})

	const { isOpen, onOpen, onClose } = useDisclosure()

	const {
		selectedFilters,
		tempFilters,
		isConfirmOpen,
		setConfirmOpen,
		handleFilterChange,
		handleConfirmFilters
	} = useFilters(isOpen, onClose)

	if (isLoading) {
		return (
			<Flex
				justify="center"
				align="center"
				height="100vh"
				width="100vw"
			>
				<Spinner size="xl" />
			</Flex>
		)
	}

	return (
		<>
			<Box
				maxW="90rem"
				mx="auto"
				minH="100dvh"
				p={5}
			>
				<MainPage
					selectedFilters={selectedFilters}
					filterData={filterData}
					onOpen={onOpen}
				/>

				<FilterModal
					filterData={filterData}
					isOpen={isOpen}
					onClose={onClose}
					tempFilters={tempFilters}
					handleFilterChange={handleFilterChange}
					setConfirmOpen={setConfirmOpen}
				/>

				<ConfirmModal
					isConfirmOpen={isConfirmOpen}
					setConfirmOpen={setConfirmOpen}
					onClose={onClose}
					handleConfirmFilters={handleConfirmFilters}
				/>
			</Box>
		</>
	)
}
