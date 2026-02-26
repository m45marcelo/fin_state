import styles from "@/components/ui/Button/CustomButton.module.css";

interface ButtonHistoryTransactionProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
}

export const ButtonHistoryTransaction: React.FC<ButtonHistoryTransactionProps> = ({title, isActive, onClick}) => {
    return(
        <button onClick={onClick} type="button" className={isActive ? `${styles.btn_primary} h-[2.25rem] text-[0.9375rem] bg-indigo-500` : "text-gray-600 h-[2.25rem] text-[0.9375rem] px-[0.875rem] font-normal flex justify-center items-center text-center hover:bg-gray-200 rounded-md"}>
            {title}
        </button>
    )
}