/* eslint-disable react/prop-types */
const TextInput = (props) => {
  return (
    <div className="flex flex-col w-[inherit] items-center">
        <input className="py-4 px-8 m-4 outline-none w-1/3 border-[1px] border-[#fff] rounded-xl text-xl" {...props}/>
        {props.error && <p className="text-[#de1b55] text-left w-1/3">{props.errorMessage}</p>}
    </div>
  )
}

export default TextInput