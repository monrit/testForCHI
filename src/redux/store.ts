import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import modalReducer from "./reducers/modalsReducer";

const rootReducer = combineReducers({
    app: appReducer,
    modal: modalReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export default store;
