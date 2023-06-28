import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import "./App.css";
import { useEffect } from "react";
import { initialize, setLocalData } from "./redux/reducers/appReducer";
import ModalConfirmation from "./components/ModalConfirmation/ModalConfirmation";
import { closeModal } from "./redux/reducers/modalsReducer";

const App = () => {
    const initialized = useSelector(store => store.app.initialized);
    const modalProps = useSelector(store => store.modal.modalProps);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    if (!initialized) {
        return <LinearProgress sx={{ width: "100%" }}/>;
    }

    return (
        <BrowserRouter>
            <Router />
            <ModalConfirmation {...modalProps} handleClose={() => dispatch(closeModal())}/>
        </BrowserRouter>
    );
};

export default App;
