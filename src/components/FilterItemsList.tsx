import { List, ListItem, Text } from '@chakra-ui/react'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

type Props = {
	selectedFilters: SearchRequestFilter
	filterData?: FilterChoose[]
}

export const FilterItemsList: React.FC<Props> = ({
	selectedFilters,
	filterData
}) => {
	return (
		<>
			<List
				spacing={2}
				mt={2}
			>
				{selectedFilters.map(filter => (
					<ListItem key={filter.id}>
						<Text textStyle="body-text-2">
							{filterData?.find(fil => fil.id === filter.id)?.name}:
						</Text>
						<Text>
							{filter.optionsIds
								.map(
									optionId =>
										filterData
											?.find(fil => fil.id === filter.id)
											?.options.find(option => option.id === optionId)?.name
								)
								.join(', ')}
						</Text>
					</ListItem>
				))}
			</List>
		</>
	)
}
