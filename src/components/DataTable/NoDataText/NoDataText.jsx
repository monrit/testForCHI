import { TableCell, TableRow, Typography } from "@mui/material";

const NoDataText = () => {
    return (
        <>
            <TableRow>
                <TableCell align="center" colSpan={8} sx={{ borderBottom: "none" }}>
                    <Typography sx={{ color: "gray" }} variant="body1">
                        No results
                    </Typography>
                </TableCell>
            </TableRow>
        </>
    );
};

export default NoDataText;
