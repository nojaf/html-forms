import React, { useState, memo } from "react";

// Memoized Input component
const Input = memo(({ label, value, onChange }) => {
  console.log(`${label} input rendered`);
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
});

function MyForm() {
  const [formData, setFormData] = useState({ field1: "", field2: "" });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div>
      <Input
        label="Field 1"
        value={formData.field1}
        onChange={handleChange("field1")}
      />
      <Input
        label="Field 2"
        value={formData.field2}
        onChange={handleChange("field2")}
      />
    </div>
  );
}

export default MyForm;
