import { useSelector } from "react-redux";

const Notification = ({ className }) => {
    const notification = useSelector((state) => state.notification);
    return notification ? (
        <div className={className}>{notification}</div>
    ) : null;
};

export default Notification;
