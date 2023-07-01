import { Box, Chip } from "@mui/material";
import ActionMenu from "./ActionMenu/ActionMenu";
import { CarType } from "../../api/data";

type ColumnType = {
    id: keyof CarType | "actions";
    align: "left" | "right" | "center";
    label: string;
    minWidth: number;
};

export const columns: ColumnType[] = [
    { id: "car", align: "left", label: "Company", minWidth: 120 },
    { id: "car_model", align: "left", label: "Model", minWidth: 180 },
    { id: "car_vin", align: "left", label: "VIN", minWidth: 200 },
    { id: "car_color", align: "left", label: "Color", minWidth: 100 },
    { id: "car_model_year", align: "left", label: "Year", minWidth: 80 },
    { id: "price", align: "left", label: "Price", minWidth: 100 },
    { id: "availability", align: "left", label: "Availability", minWidth: 100 },
    { id: "actions", align: "center", label: "Actions", minWidth: 100 },
];

export const conditionalRender = (row: CarType, id: keyof CarType | "actions") => {
    if (id === "actions") {
        return <ActionMenu row={row} />;
    } else if (id === "availability") {
        return (
            <Chip
                label={row[id] ? "Available" : "Unavailable"}
                color={row[id] ? "success" : "error"}
                variant="outlined"
                size="small"
            />
        );
    } else if (id === "car_color") {
        const color = row[id];
        const bgColor =
            color === "Mauv"
                ? "#e0b0ff"
                : color === "Puce"
                ? "#cc8899"
                : color === "Fuscia"
                ? "#ff00ff"
                : color;
        return (
            <>
                <Box
                    sx={{
                        width: "12px",
                        height: "12px",
                        mr: "4px",
                        backgroundColor: bgColor,
                        display: "inline-block",
                    }}
                />
                {row[id]}
            </>
        );
    } else {
        return String(row[id]);
    }
};
