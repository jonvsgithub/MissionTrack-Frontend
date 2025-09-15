interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  placeholder?: string; // optional placeholder prop
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ label, name, value, options, placeholder, onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block font-bold mb-2">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">{placeholder || "-- Select --"}</option>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default Select;
