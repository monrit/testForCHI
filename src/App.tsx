import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { LinearProgress } from "@mui/material";
import "./App.css";
import { FC, useEffect } from "react";
import { initialize } from "./redux/reducers/appReducer";
import ModalConfirmation from "./components/ModalConfirmation/ModalConfirmation";
import ModalForm from "./components/ModalForm/ModalForm";
import { AppStateType } from "./redux/store";

const App: FC = () => {
    const initialized = useSelector((store: AppStateType) => store.app.initialized);
    const modalProps = useSelector((store: AppStateType) => store.modal.modalProps);
    const modalFormProps = useSelector((store: AppStateType) => store.modal.modalFormProps);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    if (!initialized) {
        return <LinearProgress sx={{ width: "100%" }} />;
    }

    return (
        <BrowserRouter>
            <Router />
            <ModalConfirmation {...modalProps} />
            <ModalForm {...modalFormProps} />
        </BrowserRouter>
    );
};

export default App;
