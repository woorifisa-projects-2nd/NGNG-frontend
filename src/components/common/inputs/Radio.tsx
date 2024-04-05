import { useState } from "react";

export default function Radio() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="radio"
        style={{}}
        className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300  checked:border-4 checked:border-white checked:shadow-point-color checked:shadow-radio checked:bg-point-color checked:accent-point-color"
        value="option1"
        checked={selectedOption === "option1"}
        onChange={handleOptionChange}
      />
      <span className="ml-2 text-gray-700">옵션 1</span>
    </label>
  );
}
