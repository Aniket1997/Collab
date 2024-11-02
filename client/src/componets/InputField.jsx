const InputField = ({ label, type, name, value, onChange, required }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-400"
      />
    </div>
  );

export default InputField;