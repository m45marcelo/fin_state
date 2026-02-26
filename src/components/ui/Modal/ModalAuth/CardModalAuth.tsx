"use client"
import { MdLock, MdOutlineLogin } from "react-icons/md";
import { CustomButton } from "../../Button/CustomButton";
import { CustomText } from "../../TextComponents/CustomText";
import Link from "next/link";
import { useAppDispatch } from "@/hooks";
import { closeModal } from "@/store/slices/modalSlice";

export const CardModalAuth = () => {
    const dispatch = useAppDispatch();
	return (
		<div className="h-[326px] w-full max-w-[333px] flex flex-col items-center justify-center p-[1.375rem] rounded-2xl bg-white">
			<div className="h-16 w-16 mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
				<MdLock className="text-[30px] text-indigo-600" />
			</div>
			<CustomText className="text-[1.125rem] mb-4 text-gray-900 font-semibold mb-[0.625rem]">
				Faça Login
			</CustomText>
			<CustomText className="text-xs mb-6 font-medium text-gray-500 text-center max-w-[21.25rem] mb-6">
				Você precisa estar logado para acessar esta funcionalidade e salvar seus
				dados.
			</CustomText>

			<Link href={"/login"} className="w-full">
                <CustomButton
                    iconButton={MdOutlineLogin}
                    type="submit"
                    title="Entrar na Conta"
                    stylesButton="text-[0.9375rem] h-[2.375rem] w-full bg-indigo-500 hover:bg-indigo-600 mb-3"
                    isPrimary
                />
            </Link>

            <Link href={"/signup"} className="w-full">
                <CustomButton
                    type="button"
                    title="Criar Conta"
                    stylesButton="text-[0.9375rem] h-[2.375rem] w-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                    isPrimary={false}
                    
                />
            </Link>

			<button onClick={() => dispatch(closeModal())} type="button" className="text-[0.75rem] text-gray-400 underline mt-3">
				Cancelar
			</button>
		</div>
	);
};
