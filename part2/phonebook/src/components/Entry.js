const Entry = ({ person: { name, number, id }, handleDelete }) => (
    // console.log("Entry name:", name);
    // I will use .map() to pass each object individually to Entry
    <>
        {name} {number}
        <button className="deleteEntry" key={id} onClick={handleDelete}>
            delete
        </button>
        <br></br>
    </>
);
export default Entry;
