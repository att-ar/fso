import { createContext, useReducer, useContext } from "react";

const notifReducer = (state, action) => {
    switch (action.type) {
        case "SUCCESS":
            return { notif: action.payload, status: "success" };
        case "ERROR":
            return { notif: action.payload, status: "error" };
        case "CLEAR":
            return state.notif === action.payload ? "" : state;
        default:
            return "";
    }
};

const NotifContext = createContext();

export const NotifContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notifReducer, {
        notif: "",
        status: "",
    });

    return (
        <NotifContext.Provider value={[notif, notifDispatch]}>
            {props.children}
        </NotifContext.Provider>
    );
};

export const useNotifValue = () => {
    const notifAndDispatch = useContext(NotifContext);
    return notifAndDispatch[0];
};

export const useNotifDispatch = () => {
    const notifAndDispatch = useContext(NotifContext);
    return notifAndDispatch[1];
};

export default NotifContext;
