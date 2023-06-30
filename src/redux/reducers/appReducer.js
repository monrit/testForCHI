import { data } from "../../api/data";

const INITIALIZE = "app/INITIALIZE";
const DELETE_CAR = "app/DELETE-CAR";
const ADD_CAR = "app/ADD-CAR";
const EDIT_CAR = "app/EDIT-CAR";
const FILTER_CARS = "app/FILTER-CARS";

const initialState = {
    cars: [],
    unfilteredCars: [],
    initialized: false,
};

const saveCarsToLocalStorage = arr => {
    localStorage.setItem("cars", JSON.stringify(arr));
};

const getCarsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("cars"));
};

const editCarCase = (state, action, cars) => {
    return state[cars].map(car => {
        if (car.id === action.car.id) {
            return action.car;
        } else {
            return car;
        }
    });
};

const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case INITIALIZE: {
            const localData = getCarsFromLocalStorage();
            const cars = localData ? localData : data.cars;

            return {
                ...state,
                cars: cars,
                unfilteredCars: cars,
                initialized: true,
            };
        }
        case DELETE_CAR: {
            const newUnfilteredCars = state.unfilteredCars.filter(car => car.id !== action.id);

            let newCars = newUnfilteredCars;
            if (state.cars.length !== newUnfilteredCars.length + 1) {
                newCars = state.cars.filter(car => car.id !== action.id);
            }

            saveCarsToLocalStorage(newUnfilteredCars);
            return {
                ...state,
                cars: newCars,
                unfilteredCars: newUnfilteredCars,
            };
        }
        case ADD_CAR: {
            const newCar = {
                ...action.car,
                id:
                    state.unfilteredCars[state.unfilteredCars.length - 1].id +
                    state.unfilteredCars[0].id +
                    1,
            };
            const newUnfilteredCars = [newCar, ...state.unfilteredCars];

            let newCars = newUnfilteredCars;
            if (state.cars.length + 1 !== newUnfilteredCars.length) {
                newCars = [newCar, ...state.cars];
            }

            saveCarsToLocalStorage(newUnfilteredCars);
            return {
                ...state,
                cars: newCars,
                unfilteredCars: newUnfilteredCars,
            };
        }
        case EDIT_CAR: {
            const newUnfilteredCars = editCarCase(state, action, "unfilteredCars");

            let newCars = newUnfilteredCars;
            if (state.cars.length !== newUnfilteredCars.length) {
                newCars = editCarCase(state, action, "cars");
            }

            saveCarsToLocalStorage(newUnfilteredCars);
            return {
                ...state,
                cars: newCars,
                unfilteredCars: newUnfilteredCars,
            };
        }
        case FILTER_CARS: {
            return {
                ...state,
                cars: state.unfilteredCars.filter(car =>
                    car.car.toLowerCase().startsWith(action.query.toLowerCase())
                ),
            };
        }
        default:
            return state;
    }
};

export const initialize = () => ({ type: INITIALIZE });
export const deleteCar = id => ({ type: DELETE_CAR, id });
export const addCar = car => ({ type: ADD_CAR, car });
export const editCar = car => ({ type: EDIT_CAR, car });
export const filterCars = query => ({ type: FILTER_CARS, query });

export default appReducer;
