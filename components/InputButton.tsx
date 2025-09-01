interface InputButtonProps{
    buttonText: string, 
    onSubmit: () => void
}
const InputButton = ({buttonText, onSubmit}: InputButtonProps) => {
  return (
    <button type="button" onClick={onSubmit} className="cursor-pointer w-full bg-blue-600 p-3 rounded-xl text-white">{buttonText}</button>
  )
}

export default InputButton