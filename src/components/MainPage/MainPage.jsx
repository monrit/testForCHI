import { Box, Typography } from "@mui/material";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const totalCount = useSelector(store => store.app.cars.length);
    const cars = useSelector(store => store.app.cars);

    const [searchParams, setSearchParams] = useSearchParams();
    const urlPage = Number(searchParams.get("page"));
    const urlRowsPerPage = Number(searchParams.get("rowsPerPage"));
    const currentParams = Object.fromEntries(searchParams.entries());

    const rowsPerPageOptions = useMemo(() => [10, 25, 50], []);

    const onPageChange = useCallback(
        (e, newPage) => {
            setSearchParams({ ...currentParams, page: newPage + 1 });
        },
        [setSearchParams, currentParams]
    );

    const onRowsPerPageChange = e => {
        setSearchParams({ ...currentParams, page: 1, rowsPerPage: e.target.value });
    };

    useEffect(() => {
        if (urlRowsPerPage !== rowsPerPage) {
            if (rowsPerPageOptions.includes(urlRowsPerPage)) {
                setRowsPerPage(prev => urlRowsPerPage);
                return;
            } else {
                setSearchParams({ ...currentParams, rowsPerPage: 10 });
                return;
            }
        }

        if (urlPage !== page + 1) {
            const localRowsPerPage = urlRowsPerPage ? urlRowsPerPage : rowsPerPage;

            if (localRowsPerPage * urlPage <= totalCount && urlPage > 0) {
                setPage(prev => urlPage - 1);
            } else {
                onPageChange(null, 0);
            }
        }
    }, [
        urlPage,
        urlRowsPerPage,
        page,
        rowsPerPage,
        currentParams,
        rowsPerPageOptions,
        totalCount,
        onPageChange,
        setSearchParams,
    ]);

    useEffect(() => {
        if (urlRowsPerPage === rowsPerPage && urlPage === page + 1) {
            setRows(prev => cars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        }
    }, [page, rowsPerPage, cars, urlPage, urlRowsPerPage]);

    return (
        <>
            <Box sx={{ width: "100%", height: 500 }}>
                <Typography sx={{ textAlign: "center", mb: "4px", mt: "4px" }}>CHI CARS</Typography>
                <DataTable
                    rows={rows}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    totalCount={totalCount}
                    rowsPerPageOptions={rowsPerPageOptions}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </Box>
        </>
    );
};

export default MainPage;
