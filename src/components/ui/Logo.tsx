import { MdAccountBalanceWallet } from "react-icons/md";
import { CustomText } from "./TextComponents/CustomText";

const Logo = () => {
    return (
        <div className="flex">
            <MdAccountBalanceWallet size={26} color="#6366f1"/>
            <CustomText className="text-lg font-bold text-indigo-600 ml-[7px]">FinState</CustomText>
        </div>
    )
};

export default Logo