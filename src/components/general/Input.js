import './general.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Input = ({
                   label,
                   type,
                   className,
                   value,
                   setValue,
                   icon = null,
                   inputAttributes,
               }) => {
    const handleInput = (e) => setValue(e.target.value);
    return (
        <div className="input">
            <div className={`label ${className}`}>
                {icon && <FontAwesomeIcon icon={icon} className="icon"/>}
                <span>{label}:</span>
            </div>
            <input
                {...inputAttributes}
                className={className}
                type={type}
                onChange={handleInput}
                value={value}
            ></input>
        </div>
    );
};

export default Input;
