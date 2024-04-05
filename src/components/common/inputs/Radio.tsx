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
        className="appearance-none w-6 h-6 rounded-full border-2 border-gray-300 checked:bg-point-color checked:border-transparent focus:outline-none"
        value="option1"
        checked={selectedOption === "option1"}
        onChange={handleOptionChange}
      />
      <span className="ml-2 text-gray-700">옵션 1</span>
    </label>
  );
}
