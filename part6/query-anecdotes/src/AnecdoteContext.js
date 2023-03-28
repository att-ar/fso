import { createContext, useReducer, useContext } from "react";

const notifReducer = (state, action) => {
    switch (action.type) {
        case "VOTE":
            return `anecdote '${action.payload}' voted`;
        case "CREATE":
            return `anecdote '${action.payload}' created`;
        case "ERROR":
            return action.payload;
        case "CLEAR":
            return state.includes(action.payload) ? "" : state;
        default:
            return "";
    }
};

const NotifContext = createContext();

export const NotifContextProvider = (props) => {
    const [notif, notifDispatch] = useReducer(notifReducer, 0);

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
