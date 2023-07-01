import { TableCell, TableRow, Typography } from "@mui/material";
import { FC } from "react";

const NoDataText: FC = () => {
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
