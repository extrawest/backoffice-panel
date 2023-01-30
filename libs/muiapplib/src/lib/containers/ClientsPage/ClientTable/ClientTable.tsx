import { FC, Fragment, useCallback, useState } from "react";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Toolbar,
	Typography
} from "@mui/material";
import ClientTableItem from "./ClientTableItem/ClientTableItem";
import { Button } from "../../../components";
import { ClientTableProps } from "./ClientTable.types";
import { tableHeaderTitles } from "./ClientTable.utils";
import { clientTableStyles } from "./ClientTable.styles";
import plusIcon from "../../../assets/icons/plusIcon.svg";
import filterIcon from "../../../assets/icons/filterIcon.svg";

const ClientTable: FC<ClientTableProps> = ({
	data,
	onClickAddButton
}) => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(4);

	const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}, [setPage, setRowsPerPage]);

	const handleChangePage = useCallback((event: unknown, newPage: number) => {
		setPage(newPage);
	}, []);

	return (
		<>
			<Toolbar
				sx={clientTableStyles.headerButtons}
			>
				<Typography variant="h6">All tickets</Typography>
				<Box
					sx={clientTableStyles.buttonWrapper}
				>
					<Button
						variant={"default"}
						icon={plusIcon}
						onClick={onClickAddButton}
					>
						Add
					</Button>
					<Button
						variant={"default"}
						icon={filterIcon}
					>
						Filter
					</Button>
				</Box>
			</Toolbar>
			<TableContainer>
				<Table sx={{minWidth: 850}}>
					<TableHead>
						<TableRow>
							{tableHeaderTitles.map((item, i) => (
								<TableCell
									key={i}
								>
									<Typography variant="subtitle2">{item}</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => (
							<Fragment key={i}>
								<ClientTableItem client={item} />
							</Fragment>
						))}
					</TableBody>
				</Table>
			</ TableContainer>
			<TablePagination
				rowsPerPageOptions={[2, 4, 8]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				colSpan={20}
			/>
		</>
	);
};

export default ClientTable;
