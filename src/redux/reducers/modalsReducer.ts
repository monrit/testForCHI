import { CarType } from "../../api/data";

const OPEN_MODAL = "modals/OPEN-MODAL";
const CLOSE_MODAL = "modal/CLOSE-MODAL";
const OPEN_MODAL_FORM = "modals/OPEN-MODAL-FORM";
const CLOSE_MODAL_FORM = "modal/CLOSE-MODAL-FORM";

type ModalsInitialStateType = {
    modalProps: {
        open: boolean;
        id: number;
        carName: string;
        carModel: string;
        vinNumber: string;
    };
    modalFormProps: {
        open: boolean;
        editMode: boolean;
        carInfo: CarType | undefined;
    };
};

const initialState: ModalsInitialStateType = {
    modalProps: {
        open: false,
        id: -1,
        carName: "",
        carModel: "",
        vinNumber: "",
    },
    modalFormProps: {
        open: false,
        editMode: false,
        carInfo: {} as CarType,
    },
};

type ActionType =
    | OpenModalActionType
    | OpenModalFormActionType
    | CloseModalActionType
    | CloseModalFormActionType;

const modalReducer = (state = initialState, action: ActionType): ModalsInitialStateType => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalProps: {
                    open: true,
                    id: action.id,
                    carName: action.carName,
                    carModel: action.carModel,
                    vinNumber: action.vinNumber,
                },
            };
        case OPEN_MODAL_FORM:
            return {
                ...state,
                modalFormProps: {
                    open: true,
                    editMode: action.editMode,
                    carInfo: action.carInfo,
                },
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modalProps: {
                    ...state.modalProps,
                    open: false,
                },
            };
        case CLOSE_MODAL_FORM:
            return {
                ...state,
                modalFormProps: {
                    ...state.modalFormProps,
                    open: false,
                },
            };
        default:
            return state;
    }
};

type OpenModalActionType = {
    type: typeof OPEN_MODAL;
    id: number;
    carName: string;
    carModel: string;
    vinNumber: string;
};

type OpenModalFormActionType = {
    type: typeof OPEN_MODAL_FORM;
    editMode: boolean;
    carInfo?: CarType;
};

type CloseModalActionType = {
    type: typeof CLOSE_MODAL;
};

type CloseModalFormActionType = {
    type: typeof CLOSE_MODAL_FORM;
};

export const openModal = (
    id: number,
    carName: string,
    carModel: string,
    vinNumber: string
): OpenModalActionType => ({
    type: OPEN_MODAL,
    id,
    carName,
    carModel,
    vinNumber,
});

export const openModalForm = (editMode: boolean, carInfo?: CarType): OpenModalFormActionType => ({
    type: OPEN_MODAL_FORM,
    editMode,
    carInfo,
});
export const closeModal = (): CloseModalActionType => ({ type: CLOSE_MODAL });
export const closeModalForm = (): CloseModalFormActionType => ({ type: CLOSE_MODAL_FORM });

export default modalReducer;
