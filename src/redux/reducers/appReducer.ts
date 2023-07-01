import { CarType, data } from "../../api/data";

const INITIALIZE = "app/INITIALIZE";
const DELETE_CAR = "app/DELETE-CAR";
const ADD_CAR = "app/ADD-CAR";
const EDIT_CAR = "app/EDIT-CAR";
const FILTER_CARS = "app/FILTER-CARS";

type AppInitialStateType = {
    cars: Array<CarType>;
    unfilteredCars: Array<CarType>;
    initialized: boolean;
};

const initialState: AppInitialStateType = {
    cars: [],
    unfilteredCars: [],
    initialized: false,
};

const saveCarsToLocalStorage = (arr: Array<CarType>): void => {
    localStorage.setItem("cars", JSON.stringify(arr));
};

const getCarsFromLocalStorage = (): Array<CarType> | null => {
    const cars: string | null = localStorage.getItem("cars");

    if (cars) {
        return JSON.parse(cars);
    }
    return null;
};

const editCarCase = (
    state: AppInitialStateType,
    action: EditCarActionType,
    cars: "unfilteredCars" | "cars"
): Array<CarType> => {
    return state[cars].map(car => {
        if (car.id === action.car.id) {
            return action.car;
        } else {
            return car;
        }
    });
};

type ActionType =
    | InitializeActionType
    | DeleteCarActionType
    | AddCarActionType
    | EditCarActionType
    | FilterCarsActionType;

const appReducer = (state = initialState, action: ActionType): AppInitialStateType => {
    switch (action.type) {
        case INITIALIZE: {
            const localData: CarType[] | null = getCarsFromLocalStorage();
            const cars: CarType[] = localData ? localData : data.cars;

            return {
                ...state,
                cars: cars,
                unfilteredCars: cars,
                initialized: true,
            };
        }
        case DELETE_CAR: {
            const newUnfilteredCars: CarType[] = state.unfilteredCars.filter(
                car => car.id !== action.id
            );

            let newCars: CarType[] = newUnfilteredCars;
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
            const newCar: CarType = {
                ...action.car,
                id:
                    state.unfilteredCars[state.unfilteredCars.length - 1].id +
                    state.unfilteredCars[0].id +
                    1,
            };
            const newUnfilteredCars: CarType[] = [newCar, ...state.unfilteredCars];

            let newCars: CarType[] = newUnfilteredCars;
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
            const newUnfilteredCars: CarType[] = editCarCase(state, action, "unfilteredCars");

            let newCars: CarType[] = newUnfilteredCars;
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

type InitializeActionType = {
    type: typeof INITIALIZE;
};
type DeleteCarActionType = {
    type: typeof DELETE_CAR;
    id: number;
};
type AddCarActionType = {
    type: typeof ADD_CAR;
    car: Omit<CarType, "id">;
};
type EditCarActionType = {
    type: typeof EDIT_CAR;
    car: CarType;
};
type FilterCarsActionType = {
    type: typeof FILTER_CARS;
    query: string;
};

export const initialize = (): InitializeActionType => ({ type: INITIALIZE });
export const deleteCar = (id: number): DeleteCarActionType => ({ type: DELETE_CAR, id });
export const addCar = (car: Omit<CarType, "id">): AddCarActionType => ({ type: ADD_CAR, car });
export const editCar = (car: CarType): EditCarActionType => ({ type: EDIT_CAR, car });
export const filterCars = (query: string): FilterCarsActionType => ({ type: FILTER_CARS, query });

export default appReducer;
