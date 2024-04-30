type RadioType = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  selectedOption: string;
};
export default function Radio({
  name,
  value,
  onChange,
  selectedOption,
}: RadioType) {
  return (
    <label className="inline-flex items-center">
      <input
        data-cy={`radio-${value}`}
        type="radio"
        style={{}}
        name={name}
        className="appearance-none w-4 h-4 rounded-full border-2 border-gray-300  checked:border-4 checked:border-white checked:shadow-point-color checked:shadow-radio checked:bg-point-color checked:accent-point-color mr-2"
        value={value}
        checked={selectedOption === value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      />
    </label>
  );
}
