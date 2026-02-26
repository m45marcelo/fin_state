import clsx from "clsx"
import styles from "@/components/ui/Button/CustomButton.module.css"
import React from "react";

interface ButtonSelectDateProps{
    isSelected?: boolean;
    text: string;
    onClick: () => void;
}

export const ButtonSelectDate: React.FC<ButtonSelectDateProps> = ({isSelected, text, onClick}) => {
    return(
        <button onClick={onClick} type="button" className={
            isSelected ? styles.btn_select_date_primary : styles.btn_select_date_secundary
        }>
            {text}
        </button>
    )
}