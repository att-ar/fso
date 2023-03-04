const PersonForm = ({
    handleSubmit,
    nameValue,
    handleName,
    numberValue,
    handleNumber,
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            name: <input value={nameValue} onChange={handleName} />
        </div>
        <div>
            number: <input value={numberValue} onChange={handleNumber} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default PersonForm;
