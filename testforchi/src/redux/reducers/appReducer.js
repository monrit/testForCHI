import { data } from "../../api/data";

const INITIALIZE = "app/INITIALIZE";

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
        default:
            return state;
    }
};

export const initialize = () => ({ type: INITIALIZE });

export const setLocalData = () => (dispatch, getState) => {
    const cars = getState().app.cars;

    localStorage.setItem("cars", JSON.stringify(cars));
};

export default appReducer;
