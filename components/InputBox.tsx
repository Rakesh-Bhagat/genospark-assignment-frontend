interface InputBoxProps{
    type: string, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string
}

const InputBox = ({type, handleChange, placeholder }: InputBoxProps) => {
  return (
    <input type={type} placeholder={placeholder}  onChange={handleChange} className="border border-gray-300 rounded-md outline-none w-full p-2.5 text-neutral-500 mb-3"/>
  )
}

export default InputBox