import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Grid,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	VStack
} from '@chakra-ui/react'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { OptionsList } from './OptionsList'

type Props = {
	filterData?: FilterChoose[]
	isOpen: boolean
	onClose: () => void
	tempFilters: SearchRequestFilter
	handleFilterChange: (itemId: string, optionId: string) => void
	setConfirmOpen: (value: boolean) => void
}

export const FilterModal: React.FC<Props> = props => {
	const {
		filterData,
		isOpen,
		onClose,
		tempFilters,
		handleFilterChange,
		setConfirmOpen
	} = props
	const { t } = useTranslation()

	return (
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
	)
}
