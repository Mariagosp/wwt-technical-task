import { FilterChoose } from '@api/types/Filter'

import filteredItems from '../temp/filterData.json'

export const fetchFilteredData = async (): Promise<FilterChoose[]> => {
	return filteredItems.filterItems as FilterChoose[]
}
