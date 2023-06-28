import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import "./App.css";
import { useEffect } from "react";
import { initialize, setLocalData } from "./redux/reducers/appReducer";

const App = () => {
    const initialized = useSelector(store => store.app.initialized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());

        return () => {
            dispatch(setLocalData());
        };
    }, [dispatch]);

    if (!initialized) {
        return <LinearProgress sx={{ width: "100%" }}/>;
    }

    return (
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    );
};

export default App;
