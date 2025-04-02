import { Button} from "@material-tailwind/react";

export function ButtonMateDark(nombre, ide, type="button") {
    return (
      <Button type={type} className="flex items-center justify-center w-[90%] h-[35px] md:h-[38px] xl:h-[3.5rem] font-[nunito] text-white bg-[#7BA8FF] hover:bg-[#699bff] text-[15px] md:text-[1.5rem] lg:text-[15px] xl:text-[1.5rem] text-center rounded-none" id={ide}>{nombre}</Button>
    )
}

export function CheckboxRippleEffect() {
    return (
      <div className="flex items-center justify-center">
        <label className="relative flex items-center justify-center cursor-pointer py-3 pr-3 pl-2 rounded-full" htmlFor="r1">
          <input type="checkbox" id="r1" className="peer relative appearance-none w-5 h-5 xl:w-[1.2rem] xl:h-[1.2rem] border border-blue-gray-200 cursor-pointer transition-all before:content[''] before:block before:bg-blue-gray-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:bg-[#353C43] checked:border-[#353C43] checked:before:bg-gray-900">
          </input>

            <span className="text-white absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
            </span>
            
        </label>
        
        <label className="text-[#5F6A85] font-lightz select-none cursor-pointer mt-px xl:text-[1.1rem]" htmlFor="r1">Recuerdame</label>
      </div>
    )
}