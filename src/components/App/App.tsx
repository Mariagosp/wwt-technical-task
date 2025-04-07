import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Flex,
	Grid,
	List,
	ListItem,
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

import { FilterChoose, FilterType } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import filteredItems from '../../temp/filterData.json'

const fetchFilteredData = async (): Promise<FilterChoose[]> => {
	return filteredItems.filterItems as FilterChoose[]
}

export const App = () => {
	const { data: filterData, isLoading } = useQuery<FilterChoose[]>({
		queryFn: () => fetchFilteredData(),
		queryKey: ['filterData']
	})
	const { t } = useTranslation()

	const [selectedFilters, setSelectedFilters] = useState<SearchRequestFilter>(
		[]
	)
	const [tempFilters, setTempFilters] = useState<SearchRequestFilter>([])
	const [isConfirmOpen, setConfirmOpen] = useState(false)

	const toast = useToast()

	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		if (isOpen) {
			setTempFilters(selectedFilters)
		}
	}, [isOpen, selectedFilters])

	const updateFilter = (
		filters: SearchRequestFilter,
		itemId: string,
		optionId: string
	): SearchRequestFilter => {
		const existing = filters.find(filter => filter.id === itemId)
		if (existing) {
			const alreadySelected = existing.optionsIds.includes(optionId)
			return filters.map(filter =>
				filter.id === itemId
					? {
							...filter,
							optionsIds: alreadySelected
								? filter.optionsIds.filter(id => id !== optionId)
								: [...filter.optionsIds, optionId]
						}
					: filter
			)
		} else {
			return [
				...filters,
				{ id: itemId, type: FilterType.OPTION, optionsIds: [optionId] }
			]
		}
	}

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
						{filterData?.length && filterData?.length > 0 ? (
							<List
								spacing={2}
								mt={2}
							>
								{filterData?.map(filter => (
									<ListItem key={filter.id}>
										<Text textStyle="body-text-2">
											{filterData?.find(fil => fil.id === filter.id)?.name}:
										</Text>
										<Text>{t('filter.options')}</Text>
									</ListItem>
								))}
							</List>
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
											{item.options.map(option => (
												<Checkbox
													textStyle={'body-text-6'}
													size="md"
													key={option.id}
													onChange={() =>
														handleFilterChange(item.id, option.id)
													}
												>
													{option.name}
												</Checkbox>
											))}
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

				<Modal
					isOpen={isConfirmOpen}
					onClose={() => console.log('close')}
				>
					<ModalOverlay />
					<ModalContent
						maxW="1280px"
						py="32px"
					>
						<ModalHeader
							textStyle={'headline-2'}
							pb={'120px'}
							border={'0px'}
						>
							{t('filter.wantApplyNewFilter')}
						</ModalHeader>
						<ModalCloseButton />
						<ModalFooter>
							<Flex
								justify="center"
								align="center"
								width="100%"
							>
								<Button
									w="280px"
									h="64px"
									bg="white"
									border="2px solid gray.200"
									colorScheme="gray"
									mr={3}
								>
									{t('filter.useOldFilter')}
								</Button>
								<Button
									w="280px"
									h="64px"
									color="white"
									bg={'brand.200'}
									textStyle="button"
									_hover={{ bg: 'brand.300' }}
									onClick={handleConfirmFilters}
								>
									{t('filter.applyNewFilter')}
								</Button>
							</Flex>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	)
}
