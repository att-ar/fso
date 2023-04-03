import { useSelector } from "react-redux";

const Notification = () => {
    const { message, status } = useSelector((state) => state.notification);
    return message ? <div className={status}>{message}</div> : null;
};

export default Notification;
