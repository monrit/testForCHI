import { Button, ListItemText, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const ActionMenu = ({ row }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = event => {
        setAnchorEl(prev => event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(prev => null);
    };

    const handleEdit = () => {
        console.log("EDITING: ", row);
    };

    const handleDelete = () => {
        console.log("DELETING: ", row);
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
