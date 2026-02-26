"use client"
import { useAppSelector } from "@/hooks";

interface ModalBackgroundProps {
    children: React.ReactNode;
    modalName: string;
}

export const ModalBackground: React.FC<ModalBackgroundProps> = ({children, modalName}) => {
    const activeModal = useAppSelector(state => state.modal.activeModal);

    const isOpen = activeModal === modalName

    return(
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
            {children}
        </div>
    )
}
