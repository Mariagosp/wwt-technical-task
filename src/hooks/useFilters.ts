import { useEffect, useState } from 'react'

import { useToast } from '@chakra-ui/react'

import { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { updateFilter } from '@utils/updateFilter'

export const useFilters = (isOpen: boolean, onClose: () => void) => {
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

	return {
		selectedFilters,
		tempFilters,
		isConfirmOpen,
		setConfirmOpen,
		handleFilterChange,
		handleConfirmFilters
	}
}
