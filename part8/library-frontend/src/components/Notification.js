const Notification = ({ message }) => {
    return message ? (
        <div
            style={{
                color: "darkgreen",
                fontSize: 19,
                backgroundColor: "lightcyan",
                borderRadius: 5,
                border: "solid darkgreen",
                borderWidth: 2,
            }}>
            {message}
        </div>
    ) : null;
};

export default Notification;
