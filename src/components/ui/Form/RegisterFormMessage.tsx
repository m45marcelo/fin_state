import { MdCancel, MdCheckCircle } from "react-icons/md";

interface RegisterFormMessageProps {
	isSuccess: boolean;
	isError: boolean;
}

export const RegisterFormMessage = ({
	isSuccess,
	isError,
}: RegisterFormMessageProps) => {
	return (
		<div className="flex mt-2 h-4 items-center justify-center">
			{isSuccess && (
				<span className="text-green-600 text-xs flex items-center justify-center">
					<MdCheckCircle height={12} className="mr-1 r"/>
					Usuário criado com sucesso
				</span>
			)}

			{isError && (
				<span className="text-red-600 text-xs flex items-center justify-center">
					<MdCancel height={12} className="mr-1"/>
					Ocorreu um erro ao tentar criar uma conta
				</span>
			)}
		</div>
	);
};
