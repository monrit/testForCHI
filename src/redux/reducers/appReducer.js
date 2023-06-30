import { data } from "../../api/data";

const INITIALIZE = "app/INITIALIZE";
const DELETE_CAR = "app/DELETE-CAR";
const ADD_CAR = "app/ADD-CAR";
const EDIT_CAR = "app/EDIT-CAR";

const initialState = {
    cars: [],
    initialized: false,
};

const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIALIZE:
            const localData = JSON.parse(localStorage.getItem("cars"));
            
            return {
                ...state,
                cars: localData ? localData : data.cars,
                initialized: true,
            };
        case DELETE_CAR:
            const filteredCars = state.cars.filter(car => car.id !== action.id);
            localStorage.setItem("cars", JSON.stringify(filteredCars));
            return {
                ...state,
                cars: filteredCars
            }
        case ADD_CAR:
            const newCars = [{...action.car, id: state.cars[state.cars.length - 1].id + 1}, ...state.cars];
            localStorage.setItem("cars", JSON.stringify(newCars));
            return {
                ...state,
                cars: newCars
            };
        case EDIT_CAR:
            const editedCars = state.cars.map(car => {
                if (car.id === action.car.id) {
                    return action.car;
                } else {
                    return car;
                }
            });
            localStorage.setItem("cars", JSON.stringify(editedCars));
            return {
                ...state,
                cars: editedCars
            }
        default:
            return state;
    }
};

export const initialize = () => ({ type: INITIALIZE });
export const deleteCar = id => ({ type: DELETE_CAR, id });
export const addCar = car => ({ type: ADD_CAR, car });
export const editCar = car => ({ type: EDIT_CAR, car });

export default appReducer;
