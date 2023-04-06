import { useNotifValue } from "../contexts/NotificationContext";

const Notification = () => {
    const { notif, status } = useNotifValue();
    if (notif === null) {
        return null;
    }

    return <div className={status}>{notif}</div>;
};
export default Notification;
