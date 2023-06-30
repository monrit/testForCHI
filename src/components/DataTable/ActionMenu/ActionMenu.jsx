import { Button, ListItemText, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openModal, openModalForm } from "../../../redux/reducers/modalsReducer";

const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();

    const handleClick = event => {
        setAnchorEl(prev => event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(prev => null);
    };

    const handleEdit = () => {
        dispatch(openModalForm(true, row));
    };

    const handleDelete = () => {
        dispatch(openModal(row.id, row.car, row.car_model, row.car_vin));
    };

    return (
        <>
            <Button
                id="actionButton"
                sx={{ pt: "4px", pb: "4px", pl: "8px", pr: "8px" }}
                variant="contained"
                onClick={handleClick}
            >
                Edit
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "actionButton",
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                <MenuItem sx={{ pl: "12px", pr: "12px" }} onClick={handleEdit}>
                    <EditIcon fontSize="small" />
                    <ListItemText sx={{ ml: "4px" }}>Edit</ListItemText>
                </MenuItem>
                <MenuItem sx={{ pl: "12px", pr: "12px" }} onClick={handleDelete}>
                    <DeleteIcon fontSize="small" sx={{ color: "#FF1000" }} />
                    <ListItemText sx={{ ml: "4px", color: "#FF0800" }}>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ActionMenu;
