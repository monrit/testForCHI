import { DialogTitle } from "@mui/material";
import { FC } from "react";

type ModalTitlePropsType = {
    editMode: boolean;
};

const ModalTitle: FC<ModalTitlePropsType> = ({ editMode }) => {
    return (
        <>
            <DialogTitle id="edit-dialog-title" sx={{ fontWeight: "bold", textAlign: "center" }}>
                {editMode ? "Change allowed fields" : "Fill the new car properties"}
            </DialogTitle>
        </>
    );
};

export default ModalTitle;
