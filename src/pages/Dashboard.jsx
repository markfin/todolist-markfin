import {
	Box,
	Button,
	Grid,
	Image,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { IconPlus } from '../Icons';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { ModalDelete } from '../Modals/ModalDelete';
import { destroy, getAll, store } from '../api/activity';

 function Dashboard() {
	const [dataActivity, setDataActivity] = React.useState([]);
	const [dataSelected, setDataSelected] = React.useState({});
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loading, setLoading] = React.useState(true);
	const {
		isOpen: isOpenAlert,
		onOpen: onOpenAlert,
		onClose: onCloseAlert,
	} = useDisclosure();
	let navigate = useNavigate();

	const handleClickDelete = (e, data) => {
		e.stopPropagation();
		setDataSelected(data);
		onOpen();
	};

	const handleDelete = async () => {
		onClose();
		try {
			await destroy(dataSelected.id);
			await getActivities();
			onOpenAlert();
		} catch (error) {
			console.log(error);
		}
	};

	const handleAdd = async () => {
		try {
			await store('New Activity');
			await getActivities();
		} catch (error) {
			console.log(error);
		}
	};

	const getActivities = React.useCallback(async () => {
		try {
			const { data } = await getAll();
			setDataActivity([...data.data]);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.log(error);
		}
	}, []);

	React.useEffect(() => {
		getActivities();
	}, [getActivities]);

	return (
		<>
			<Box
				marginTop="43px"
				marginBottom="59px"
				display="flex"
				justifyContent="space-between"
			>
				<Text data-cy="activity-title" textStyle="h1">
					Activity
				</Text>
				<Button
					data-cy="activity-add-button"
					minW="150px"
					height="54px"
					bg={'prime.900'}
					color="white"
					borderRadius="45px"
					fontSize="18px"
					fontWeight="semibold"
					px="22px"
					py="13.5px"
					leftIcon={<IconPlus />}
					onClick={handleAdd}
				>
					Tambah
				</Button>
			</Box>
			{loading ? (
				<Box display="flex" justifyContent="center">
					<Spinner color="prime.900" size="lg" />
				</Box>
			) : (
				<Grid
					templateColumns={
						dataActivity.length > 0 ? `repeat(4, 1fr)` : '1fr'
					}
					rowGap="26px"
					columnGap="20px"
					marginBottom="50px"
				>
					{dataActivity.length > 0 ? (
						dataActivity.map((data, i) => (
							<Card
								dataCy={`activity-item`}
								handleClick={() =>
									navigate(`/item-list/${data.id}`)
								}
								key={data.id}
							>
								<Text
									data-cy="activity-item-title"
									textStyle="h3"
								>
									{data.title}
								</Text>
								<Box
									display="inline-flex"
									justifyContent="space-between"
									alignItems="center"
									bg="white"
								>
									<Text
										data-cy="activity-item-date"
										as="span"
										fontSize="14px"
										fontWeight="medium"
										color="#888888"
										cursor="text"
									>
										{`
										${new Date(data.created_at).toLocaleString('id', {
											day: '2-digit',
										})} ${new Date(
											data.created_at
										).toLocaleString('id', {
											month: 'long',
										})} ${new Date(
											data.created_at
										).toLocaleString('id', {
											year: 'numeric',
										})}
									`}
									</Text>
									<Image
										data-cy="activity-item-delete-button"
										src="/static/icons/delete.svg"
										alt="title"
										cursor="pointer"
										onClick={(e) =>
											handleClickDelete(e, data)
										}
									/>
								</Box>
							</Card>
						))
					) : (
						<Box
							data-cy="activity-empty-state"
							display="flex"
							justifyContent="center"
						>
							<Image
								src="/static/images/activity-empty-state.png"
								alt="activity-empty-state"
								onClick={handleAdd}
							/>
						</Box>
					)}
				</Grid>
			)}
			<ModalDelete
				isOpen={isOpen}
				onClose={onClose}
				onAction={handleDelete}
				content={`Apakah anda yakin menghapus activity<br />
				<strong>“${dataSelected?.title}”?</strong>`}
			/>
			<Modal
				data-cy="modal-information"
				isOpen={isOpenAlert}
				onClose={onCloseAlert}
				isCentered
			>
				<ModalOverlay />
				<ModalContent
					data-cy="modal-information"
					minH={'58px'}
					minW="490px"
				>
					<ModalBody display="flex" alignItems={'center'}>
						<Image
							data-cy="modal-information-icon"
							src="/static/icons/modal-information-icon.svg"
							alt="modal-information-icon"
							mr="10px"
						/>
						<Text
							data-cy="modal-information-title"
							fontSize="14px"
							fontWeight="medium"
							color="#111111"
						>
							Activity berhasil dihapus
						</Text>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
export default Dashboard