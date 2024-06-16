import './general.css';

const SelectInput = ({label, options, className, value, setValue}) => {
    const handleSelect = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className="select-input">
            <label className={className}>{label}:</label>
            <select className={className} onChange={handleSelect} value={value}>
                {options?.map((option, index) => {
                    return <option key={index} value={option}>{option}</option>;
                })}
            </select>
        </div>
    );
};

export default SelectInput;
