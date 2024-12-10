import {toast} from "react-toastify";

export const showLoadingToast = (message) => {
    return toast.loading(message);
};

export const showSuccessToast = (toastId, message) => {
    toast.update(toastId, {
        render: message,
        type: "success",
        isLoading: false,
    });
};

export const showErrorToast = (toastId, message) => {
    toast.update(toastId, {
        render: message,
        type: "error",
        isLoading: false,
    });
};

export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};
