import { useTranslation } from 'react-i18next'

import { Box, Button, Text } from '@chakra-ui/react'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { FilterItemsList } from './FilterItemsList'

type Props = {
	selectedFilters: SearchRequestFilter
	filterData?: FilterChoose[]
	onOpen: () => void
}

export const MainPage: React.FC<Props> = props => {
	const { selectedFilters, filterData, onOpen } = props
	const { t } = useTranslation()
	return (
		<>
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
		</>
	)
}
