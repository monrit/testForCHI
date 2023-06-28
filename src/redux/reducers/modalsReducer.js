const OPEN_MODAL = "modals/OPEN-MODAL";
const CLOSE_MODAL = "modal/CLOSE-MODAL";

const initialState = {
    modalProps: {
        open: false,
        handleConfirm: null,
        carName: null,
        carModel: null,
        vinNumber: null,
    },
};

const modalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                modalProps: {
                    open: true,
                    handleConfirm: action.handleConfirm,
                    carName: action.carName,
                    carModel: action.carModel,
                    vinNumber: action.vinNumber,
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
        default:
            return state;
    }
};

export const openModal = (handleConfirm, carName, carModel, vinNumber) => ({
    type: OPEN_MODAL,
    handleConfirm,
    carName,
    carModel,
    vinNumber,
});
export const closeModal = () => ({ type: CLOSE_MODAL });

export default modalReducer;
