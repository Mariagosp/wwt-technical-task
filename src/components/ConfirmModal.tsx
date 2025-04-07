import { useTranslation } from 'react-i18next'

import {
	Button,
	Flex,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

type Props = {
	isConfirmOpen: boolean
	setConfirmOpen: (value: boolean) => void
	onClose: () => void
	handleConfirmFilters: () => void
}

export const ConfirmModal: React.FC<Props> = props => {
	const { isConfirmOpen, setConfirmOpen, onClose, handleConfirmFilters } = props
	const { t } = useTranslation()
	return (
		<>
			<Modal
				isOpen={isConfirmOpen}
				onClose={() => setConfirmOpen(false)}
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
								onClick={() => {
									setConfirmOpen(false)
									onClose()
								}}
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
		</>
	)
}
