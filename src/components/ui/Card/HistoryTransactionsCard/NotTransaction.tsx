import { MdInbox } from "react-icons/md";
import { CustomText } from "../../TextComponents/CustomText";

export const NotTransaction= () => {
    return(
        <div className="h-[292px] w-full flex flex-col justify-center items-center">
            <MdInbox className="text-[56px] text-gray-300 mb-4"/>
            <CustomText className="text-base font-semibold text-gray-700 mb-1">Nenhuma Transação encontrada</CustomText>
            <CustomText className="text-[0.8125rem] font-medium text-gray-500">Comece a adicionar Transações para poder vê-las aqui</CustomText>
        </div>
    )
}