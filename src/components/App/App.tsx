import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Flex,
	Grid,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	VStack,
	useDisclosure,
	useToast
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { ConfirmModal } from '@components/ConfirmModal'
import { FilterItemsList } from '@components/FilterItemsList'
import { fetchFilteredData } from '@utils/fetchfilteredData'
import { updateFilter } from '@utils/updateFilter'

import { OptionsList } from '../OptionsList'

export const App = () => {
	const { data: filterData, isLoading } = useQuery<FilterChoose[]>({
		queryFn: () => fetchFilteredData(),
		queryKey: ['filterData']
	})
	const { t } = useTranslation()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [selectedFilters, setSelectedFilters] = useState<SearchRequestFilter>(
		[]
	)
	const [tempFilters, setTempFilters] = useState<SearchRequestFilter>([])
	const [isConfirmOpen, setConfirmOpen] = useState(false)

	const toast = useToast()

	useEffect(() => {
		if (isOpen) {
			setTempFilters(selectedFilters)
		}
	}, [isOpen, selectedFilters])

	const handleFilterChange = (itemId: string, optionId: string) => {
		setTempFilters(prev => updateFilter(prev, itemId, optionId))
	}

	const handleConfirmFilters = () => {
		setSelectedFilters(tempFilters)
		setConfirmOpen(false)
		toast({
			title: 'Filters applied',
			status: 'success',
			duration: 2000,
			isClosable: true
		})
		onClose()
	}

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
				<Text
					textStyle="headline-2"
					mb={5}
				>
					{t('filter.mainPage')}
				</Text>

				<Box
					mt={5}
					p={5}
					borderRadius="lg"
					shadow="gray-glow"
					bg="gray.50"
				>
					<Text
						textStyle="headline-4"
						mb={4}
					>
						{t('filter.yourFilters')}
					</Text>

					<Box
						mt={5}
						p={4}
						border="1px solid #ddd"
						borderRadius="md"
					>
						{selectedFilters.length > 0 ? (
							<FilterItemsList
								selectedFilters={selectedFilters}
								filterData={filterData}
							/>
						) : (
							<Text
								color="gray.500"
								mt={2}
							>
								{t('filter.noFiltersSelected')}
							</Text>
						)}
					</Box>

					<Button
						mt={3}
						bg="brand.200"
						h="44px"
						w="184px"
						color="white"
						textStyle="button"
						_hover={{ bg: 'brand.300' }}
						onClick={onOpen}
					>
						{t('filter.openFilterModal')}
					</Button>
				</Box>

				<Modal
					isOpen={isOpen}
					onClose={onClose}
				>
					<ModalOverlay />
					<ModalContent
						px="34px"
						maxW="1280px"
					>
						<ModalHeader
							borderColor="gray.200"
							borderBottomWidth="2px"
							borderBottomStyle="solid"
							textColor="gray.500"
							textStyle="headline-2"
							pt={10}
							pb={25}
						>
							{t('filter.filter')}
						</ModalHeader>

						<ModalCloseButton
							w="24px"
							h="24px"
							p={0}
						/>
						<ModalBody p={0}>
							<VStack align="start">
								{filterData?.map(item => (
									<Box
										key={item.id}
										borderColor="gray.200"
										borderBottomWidth="2px"
										borderBottomStyle="solid"
										pb={6}
										pt={8}
										w="100%"
									>
										<Text
											textStyle="headline-5"
											color="gray.500"
											mb={6}
										>
											{item.name}
										</Text>
										<Grid
											templateColumns="repeat(3, 1fr)"
											columnGap="250px"
											rowGap="24px"
											w="100%"
										>
											<OptionsList
												item={item}
												tempFilters={tempFilters}
												handleFilterChange={handleFilterChange}
											/>
										</Grid>
									</Box>
								))}
							</VStack>
						</ModalBody>
						<ModalFooter>
							<Box
								width="100%"
								display="flex"
								justifyContent="center"
							>
								<Button
									ml="170px"
									bg="brand.200"
									h="64px"
									w="184px"
									color="white"
									textStyle="button"
									borderRadius="md"
									_hover={{ bg: 'brand.300' }}
									onClick={() => setConfirmOpen(true)}
								>
									{t('filter.apply')}
								</Button>
							</Box>

							<Text
								whiteSpace="nowrap"
								ml={4}
								textStyle="body-text-5"
								borderBottom="1px"
								borderBottomColor="primary.100"
								color="primary.100"
								_hover={{ color: 'black', borderBottomColor: 'black' }}
								onClick={onClose}
								cursor={'pointer'}
							>
								{t('filter.clearAllParameters')}
							</Text>
						</ModalFooter>
					</ModalContent>
				</Modal>

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
