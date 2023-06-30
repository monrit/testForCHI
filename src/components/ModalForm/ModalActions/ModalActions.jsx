import { Button, DialogActions, FormHelperText } from "@mui/material";

const ModalActions = ({ errors, handleClose, editMode }) => {
    return (
        <>
            <DialogActions>
                <FormHelperText sx={{ mr: "auto", ml: "16px" }} error component="span">
                    {errors.car?.message ||
                        errors.car_model?.message ||
                        errors.car_vin?.message ||
                        errors.car_color?.message ||
                        errors.car_model_year?.message ||
                        errors.price?.message ||
                        errors.availability?.message}
                </FormHelperText>
                <Button type="button" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" autoFocus type="submit">
                    {editMode ? "Save" : "Create"}
                </Button>
            </DialogActions>
        </>
    );
};

export default ModalActions;
