import { data } from "../../api/data";

const INITIALIZE = "app/INITIALIZE";
const DELETE_CAR = "app/DELETE-CAR";

const initialState = {
    cars: [],
    initialized: false,
};

const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIALIZE:
            const localData = JSON.parse(localStorage.getItem("cars"));
            console.log("JOIN", localData);
            return {
                ...state,
                cars: localData ? localData : data.cars,
                initialized: true,
            };
        case DELETE_CAR:
            const cars = state.cars.filter(car => car.id !== action.id);
            localStorage.setItem("cars", JSON.stringify(cars));
            return {
                ...state,
                cars: cars
            }
        default:
            return state;
    }
};

export const initialize = () => ({ type: INITIALIZE });
export const deleteCar = id => ({ type: DELETE_CAR, id });

export default appReducer;
