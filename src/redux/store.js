import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import modalReducer from "./reducers/modalsReducer";

const store = configureStore({
    reducer: {
        app: appReducer,
        modal: modalReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
