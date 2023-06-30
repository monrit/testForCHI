import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import TableInteraction from "./TableInteraction/TableInteraction";
import { styles } from "./DataTableStyles";
import { columns, conditionalRender } from "./DataTableHelpers";
import NoDataText from "./NoDataText/NoDataText";

const DataTable = ({
    rows,
    page,
    rowsPerPage,
    totalCount,
    onPageChange,
    onRowsPerPageChange,
    rowsPerPageOptions,
}) => {
    return (
        <>
            <Box sx={{ margin: 1 }}>
                <TableInteraction />
                <Paper>
                    <TableContainer sx={styles.tableContainer}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{ minWidth: column.minWidth, fontWeight: "bold" }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.length === 0 ? (
                                    <NoDataText />
                                ) : (
                                    rows.map(row => {
                                        return (
                                            <TableRow hover tabIndex={-1} key={row.id}>
                                                {columns.map(column => {
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            sx={{ padding: "10px" }}
                                                        >
                                                            {conditionalRender(row, column.id)}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions}
                        component="div"
                        count={totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                    />
                </Paper>
            </Box>
        </>
    );
};

export default DataTable;
