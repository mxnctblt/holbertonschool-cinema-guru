import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({ label, className, onClick, icon = null }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="icon" />}
      {label}
    </button>
  );
};

export default Button;
