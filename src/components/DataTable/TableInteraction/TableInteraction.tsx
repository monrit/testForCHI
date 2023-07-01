import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModalForm } from "../../../redux/reducers/modalsReducer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ChangeEvent, FC, useState } from "react";
import { filterCars } from "../../../redux/reducers/appReducer";
import { useSearchParams } from "react-router-dom";

const TableInteraction: FC = () => {
    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const [searchParams, setSearchParams] = useSearchParams();
    const currentParams = Object.fromEntries(searchParams.entries());

    const handleClick = (): void => {
        dispatch(openModalForm(false));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(filterCars(e.target.value.trim()));
        setSearchParams({ ...currentParams, page: "1"});
        setSearch(prev => e.target.value);
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <TextField
                    label="Search"
                    variant="standard"
                    value={search}
                    onChange={handleChange}
                    sx={{ ml: 2, mb: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleClick}
                    endIcon={<AddCircleOutlineIcon />}
                    sx={{ mr: 2 }}
                >
                    {"Add car"}
                </Button>
            </Box>
        </>
    );
};

export default TableInteraction;
