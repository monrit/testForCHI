const OPEN_MODAL = "modals/OPEN-MODAL";
const CLOSE_MODAL = "modal/CLOSE-MODAL";
const OPEN_MODAL_FORM = "modals/OPEN-MODAL-FORM";
const CLOSE_MODAL_FORM = "modal/CLOSE-MODAL-FORM";

const initialState = {
    modalProps: {
        open: false,
        id: null,
        carName: null,
        carModel: null,
        vinNumber: null,
    },
    modalFormProps: {
        open: false,
        editMode: false,
        carInfo: {},
    },
};

const modalReducer = (state = initialState, action = {}) => {
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

export const openModal = (id, carName, carModel, vinNumber) => ({
    type: OPEN_MODAL,
    id,
    carName,
    carModel,
    vinNumber,
});
export const openModalForm = (editMode, carInfo) => ({
    type: OPEN_MODAL_FORM,
    editMode,
    carInfo,
});
export const closeModal = () => ({ type: CLOSE_MODAL });
export const closeModalForm = () => ({ type: CLOSE_MODAL_FORM });

export default modalReducer;
