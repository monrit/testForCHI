import { Box } from "@mui/material";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppStateType } from "../../redux/store";
import { CarType } from "../../api/data";

const MainPage: FC = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState<CarType[] | []>([]);

    const totalCount = useSelector((store: AppStateType) => store.app.cars.length);
    const cars = useSelector((store: AppStateType) => store.app.cars);

    const [searchParams, setSearchParams] = useSearchParams();
    const urlPage = Number(searchParams.get("page"));
    const urlRowsPerPage = Number(searchParams.get("rowsPerPage"));
    const currentParams = Object.fromEntries(searchParams.entries());

    const rowsPerPageOptions = useMemo((): number[] => [10, 25, 50], []);

    const onPageChange = useCallback(
        (e: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
            setSearchParams({ ...currentParams, page: String(newPage + 1) });
        },
        [setSearchParams, currentParams]
    );

    const onRowsPerPageChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void => {
        setSearchParams({ ...currentParams, page: "1", rowsPerPage: e.target.value });
    };

    useEffect(() => {
        if (urlRowsPerPage !== rowsPerPage) {
            if (rowsPerPageOptions.includes(urlRowsPerPage)) {
                setRowsPerPage(prev => urlRowsPerPage);
                return;
            } else {
                setSearchParams({ ...currentParams, rowsPerPage: "10" });
                return;
            }
        }

        if (urlPage !== page + 1) {
            const localRowsPerPage = urlRowsPerPage ? urlRowsPerPage : rowsPerPage;
            if (urlPage <= Math.ceil(totalCount / localRowsPerPage) && urlPage > 0) {
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
