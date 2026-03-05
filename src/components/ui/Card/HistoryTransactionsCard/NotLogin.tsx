import Link from "next/link";
import { MdOutlineLogin } from "react-icons/md";
import { CustomButton } from "../../Button/CustomButton";
import { CustomText } from "../../TextComponents/CustomText";

export const NotLogin = () => {
	return (
		<div className="h-[292px] w-full flex flex-col justify-center items-center">
			<MdOutlineLogin className="text-[56px] text-gray-300 mb-4" />
			<CustomText className="text-base font-semibold text-gray-700 mb-1">
				Faça Login
			</CustomText>
			<CustomText className="text-[0.8125rem] font-medium text-gray-500 mb-4">
				Você precisa estar logado para acessar esta funcionalidade e salvar seus
				dados.
			</CustomText>
			<Link href={"/login"}>
				<CustomButton
					type="button"
					title="Entrar"
					isPrimary
					iconButton={MdOutlineLogin}
					className="h-[2.375rem] bg-indigo-500 hover:bg-indigo-600"
				/>
			</Link>
		</div>
	);
};
