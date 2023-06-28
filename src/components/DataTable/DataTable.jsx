import {
    Box,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import ActionMenu from "./ActionMenu/ActionMenu";

const columns = [
    { id: "car", align: "left", label: "Company", minWidth: 120 },
    { id: "car_model", align: "left", label: "Model", minWidth: 180 },
    { id: "car_vin", align: "left", label: "VIN", minWidth: 200 },
    { id: "car_color", align: "left", label: "Color", minWidth: 100 },
    { id: "car_model_year", align: "left", label: "Year", minWidth: 80 },
    { id: "price", align: "left", label: "Price", minWidth: 100 },
    { id: "availability", align: "left", label: "Availability", minWidth: 100 },
    { id: "actions", align: "center", label: "Actions", minWidth: 100 },
];

const conditionalRender = (row, id) => {
    if (id === "actions") {
        return <ActionMenu row={row} />;
    } else if (id === "availability") {
        return (
            <Chip
                label={row[id] ? "Available" : "Unavailable"}
                color={row[id] ? "success" : "error"}
                variant="outlined"
                size="small"
            />
        );
    } else if (id === "car_color") {
        const color = row[id];
        const bgColor =
            color === "Mauv"
                ? "#e0b0ff"
                : color === "Puce"
                ? "#cc8899"
                : color === "Fuscia"
                ? "#ff00ff"
                : color;
        return (
            <>
                <Box
                    sx={{
                        width: "12px",
                        height: "12px",
                        mr: "4px",
                        backgroundColor: bgColor,
                        display: "inline-block"
                    }}
                />
                {row[id]}
            </>
        );
    } else {
        return row[id].toString();
    }
};

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
            <Paper sx={{ ml: 1, mr: 1 }}>
                <TableContainer sx={{ maxHeight: 510, overflowX: "scroll" }}>
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
                            {rows.map(row => {
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
                            })}
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
        </>
    );
};

export default DataTable;
