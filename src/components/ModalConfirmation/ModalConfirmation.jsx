import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/reducers/modalsReducer";
import { deleteCar } from "../../redux/reducers/appReducer";

const ModalConfirmation = ({ open, id, carName, carModel, vinNumber }) => {
    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());

    const handleConfirm = () => {
        dispatch(deleteCar(id));
        dispatch(closeModal());
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"You sure you want to delete this item?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`${carName} ${carModel} with VIN number: ${vinNumber} will be deleted. This
                    action cannot be undone.`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalConfirmation;
