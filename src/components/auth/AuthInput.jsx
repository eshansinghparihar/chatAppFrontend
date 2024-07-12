import { useState } from "react";
export default function AuthInput({
  name,
  type,
  placeholder,
  register,
  error,
  readOnly
}) {
  const [val, setVal] = useState(placeholder[1]);
  const handleChange = (event) => {
    setVal(event.target.value);
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor={name} className="text-sm font-bold tracking-wide">
        {placeholder[0]}
      </label>
      <input
        className="w-full dark:bg-dark_bg_3 text-base py-2 px-4 rounded-lg outline-none"
        type={type}
        placeholder={placeholder[1]}
        {...register(name)}
        value={val}
        onChange={handleChange}
        readOnly={readOnly}
      />
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
