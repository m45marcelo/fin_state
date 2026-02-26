import { MdCheckCircle } from "react-icons/md";

interface LoginFormMessageProps {
    isSuccess: boolean;
}

export const LoginFormMessage = ({
    isSuccess,
}: LoginFormMessageProps) => {
    return (
        <div className="flex h-4 mt-2 items-center justify-center">
            {isSuccess && (
                <span className="text-green-600 h-4 text-xs flex items-center justify-center">
                    <MdCheckCircle height={12} />
                    Usuário logado com sucesso
                </span>
            )}
        </div>
    );
};
