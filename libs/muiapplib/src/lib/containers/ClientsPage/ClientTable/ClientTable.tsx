import { FC, Fragment } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import ClientTableItem from "./ClientTableItem/ClientTableItem";
import { Button } from "../../../components";
import { ClientTableProps } from "./ClientTable.types";
import { tableHeaderTitles } from "./ClientTable.utils";
import { clientTableStyles } from "./ClientTable.styles";
import plusIcon from "../../../assets/icons/plusIcon.svg";
import filterIcon from "../../../assets/icons/filterIcon.svg";

const ClientTable: FC<ClientTableProps> = ({
	data
}) => {
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
				<Table>
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
						{data.map((item, i) => (
							<Fragment key={i}>
								<ClientTableItem client={item} />
							</Fragment>
						))}
					</TableBody>
				</Table>

			</ TableContainer>
		</>
	);
};

export default ClientTable;
