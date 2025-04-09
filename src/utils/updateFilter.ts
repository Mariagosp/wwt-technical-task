import { FilterType } from '@api/types/Filter'
import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

export const updateFilter = (
	filters: SearchRequestFilter,
	itemId: string,
	optionId: string
): SearchRequestFilter => {
	const existedFilter = filters.find(filter => filter.id === itemId)
	if (existedFilter) {
		const alreadySelected = existedFilter.optionsIds.includes(optionId)
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
