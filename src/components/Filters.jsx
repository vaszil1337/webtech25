import { useState } from "react";

export default function Filters({ filters, onFilterChange }) {
  const [values, setValues] = useState({
    searchTerm: "",
    ...filters.reduce((acc, f) => ({ ...acc, [f.key]: "all" }), {}),
  });

  const handleSearchChange = (e) => {
    const updated = { ...values, searchTerm: e.target.value };
    setValues(updated);
    onFilterChange(updated);
  };

  const handleSelectChange = (key, value) => {
    const updated = { ...values, [key]: value };
    setValues(updated);
    onFilterChange(updated);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <input
        type="text"
        value={values.searchTerm}
        onChange={handleSearchChange}
        placeholder="Keresés név szerint..."
        className="input input-bordered w-full sm:w-64"
      />

      {filters.map(({ key, label, options }) => (
        <select
          key={key}
          value={values[key]}
          onChange={(e) => handleSelectChange(key, e.target.value)}
          className="select select-bordered"
        >
          <option value="all">Összes {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ))}
    </div>
  );
}