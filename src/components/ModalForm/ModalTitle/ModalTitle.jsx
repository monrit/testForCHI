import { DialogTitle } from "@mui/material";

const ModalTitle = ({ editMode }) => {
    return (
        <>
            <DialogTitle id="edit-dialog-title" sx={{ fontWeight: "bold", textAlign: "center" }}>
                {editMode ? "Change allowed fields" : "Fill the new car properties"}
            </DialogTitle>
        </>
    );
};

export default ModalTitle;
