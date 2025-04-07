import { Checkbox } from '@chakra-ui/react'

import { FilterChoose } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

type Props = {
	item: FilterChoose
	tempFilters: SearchRequestFilter
	handleFilterChange: (itemId: string, optionId: string) => void
}

export const OptionsList: React.FC<Props> = props => {
	const { item, tempFilters, handleFilterChange } = props
	return (
		<>
			{item.options.map(option => (
				<Checkbox
					textStyle={'body-text-6'}
					size="md"
					key={option.id}
					isChecked={tempFilters
						.find(filter => filter.id === item.id)
						?.optionsIds.includes(option.id)}
					onChange={() => handleFilterChange(item.id, option.id)}
				>
					{option.name}
				</Checkbox>
			))}
		</>
	)
}
