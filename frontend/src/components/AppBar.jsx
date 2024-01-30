import DropDown from "./DropDown"
export const Appbar = () => {
    return <div className="shadow h-14 flex justify-between mb-10">
        <div className="flex flex-col justify-center h-full ml-4 font-bold text-3xl">
            MoneyMingle
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello User
            </div>
            <div className="flex mt-2">
                <DropDown />
            </div>
        </div>
        
    </div>
}