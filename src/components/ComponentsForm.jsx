export function logoSoftware(){
    return(
        <h2 className="text-[30px] md:text-[3rem] lg:text-[2.5rem] xl:text-[2.5rem] font-[nunito-semibold] text-[#7BA8FF] border-l-2 border-[#343c53] pl-2">Köntab</h2>
    )
}

export function txtInput(id, type, label, required){
    return(
        <>
            <div className="relative h-11 md:h-[4rem] w-full min-w-[200px]">
                <input
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-5 font-[nunito-sans] text-[13px] md:text-[1rem] lg:text-[1.2rem] font-normal text-black outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-[#5e6a80] focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder={label}
                    type={type}
                    id = {id}
                    required={required}
                />
                <label htmlFor={id} className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-[1px] after:border-[#7BA8FF] after:transition-transform after:duration-700 peer-focus:after:scale-x-100 peer-focus:after:border-[#7BA8FF]">
                </label>
            </div>
        </>
    )
}

export function itemFormRegister(input1, input2, input3, input4){
    return(
        <>
            <section className="flex flex-col items-center justify-center w-full px-[1.5vh]">

                <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                    {input1}
                </div>

                <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                    {input2}
                </div>

                <div className="relative flex flex-col items-center w-[90%] md:w-[80%] mb-2">
                    {input3}
                </div>

                <div className="relative flex flex-col items-center w-[90%] md:w-[80%]">
                    {input4}
                </div>

            </section>
        </>
    )
}