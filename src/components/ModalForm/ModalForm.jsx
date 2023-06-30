import { Dialog, DialogContent, InputAdornment, MenuItem, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { modalFormValidation } from "./modalFormValidation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCar, editCar } from "../../redux/reducers/appReducer";
import { closeModalForm } from "../../redux/reducers/modalsReducer";
import ModalActions from "./ModalActions/ModalActions";
import ModalTitle from "./ModalTitle/ModalTitle";

const selectOptions = [
    { label: "Available", value: true },
    { label: "Unavailable", value: false },
];

const ModalForm = ({ open, editMode, carInfo }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        mode: "onBlur",
    });

    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModalForm());

    const onSubmit = data => {
        data.car_model_year = Number(data.car_model_year);
        data.price = "$" + data.price;
        if (data.car === undefined) {
            const newCar = {
                ...carInfo,
                car_color: data.car_color,
                price: data.price,
                availability: data.availability,
            };
            dispatch(editCar(newCar));
        } else {
            dispatch(addCar(data));
        }
        handleClose();
    };

    useEffect(() => {
        if (editMode && open === true) {
            reset();
            setValue("car_color", carInfo?.car_color);
            setValue("price", carInfo?.price?.slice(1));
            setValue("availability", carInfo?.availability);
        } else if (!editMode && open === true) {
            reset();
        }
    }, [carInfo, editMode, open, setValue, reset]);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth="xl"
                aria-labelledby="edit-dialog-title"
                aria-describedby="edit-dialog-description"
            >
                <ModalTitle editMode={editMode} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent
                        sx={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: { xs: "column", sm: "row" },
                            flexWrap: "wrap",
                        }}
                    >
                        <TextField
                            label={editMode ? carInfo.car : "Company"}
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 120 } }}
                            {...register("car", {
                                ...modalFormValidation.company,
                                disabled: editMode,
                            })}
                        />
                        <TextField
                            label={editMode ? carInfo.car_model : "Model"}
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 180 } }}
                            {...register("car_model", {
                                ...modalFormValidation.model,
                                disabled: editMode,
                            })}
                        />
                        <TextField
                            label={editMode ? carInfo.car_vin : "VIN"}
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 200 } }}
                            {...register("car_vin", {
                                ...modalFormValidation.vin,
                                disabled: editMode,
                            })}
                        />
                        <TextField
                            label="Color"
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 120 } }}
                            {...register("car_color", modalFormValidation.color)}
                        />
                        <TextField
                            label={editMode ? carInfo.car_model_year : "Year"}
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 80 } }}
                            {...register("car_model_year", {
                                ...modalFormValidation.year,
                                disabled: editMode,
                            })}
                        />
                        <TextField
                            label="Price"
                            variant="standard"
                            sx={{ maxWidth: { xs: 270, lg: 120 } }}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            {...register("price", modalFormValidation.price)}
                        />
                        <TextField
                            select
                            label="Availability"
                            variant="standard"
                            InputProps={{
                                sx: { maxWidth: { xs: 270, lg: 120 }, width: { xs: 270, lg: 120 } },
                                defaultValue: carInfo?.availability || false,
                            }}
                            {...register("availability", modalFormValidation.availability)}
                        >
                            {selectOptions.map(option => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </DialogContent>
                    <ModalActions errors={errors} editMode={editMode} handleClose={handleClose} />
                </form>
            </Dialog>
        </>
    );
};

export default ModalForm;
