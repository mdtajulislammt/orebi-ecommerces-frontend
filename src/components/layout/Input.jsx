
const Input = ({ type, placeholder, className, onChange, value, id }) => {
  return (
    <input
      id={id}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
