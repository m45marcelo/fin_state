"use client";
import Image from "next/image";
import { LoginUserForm } from "@/components/ui/Form/LoginUserForm";
import { CustomText } from "@/components/ui/TextComponents/CustomText";
import logo from "../../../public/assets/images/logo-white.svg";
import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import { useGetMeQuery } from "@/store/api/userApi";

const Login = () => {
    const { data, isLoading } = useGetMeQuery();
    if(isLoading) return null;
	if (data?.user) return null;
	return (
		<div className="h-screen w-full flex justify-center items-center bg-[#F9FAFB]">
			<div className="h-[33.125rem] w-full max-w-[58.875rem] flex bg-white rounded-[1.75rem] shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)] overflow-hidden">
				<div className="relative w-full max-w-[25rem] h-full flex flex-col items-center justify-center bg-indigo-600 ">
                    <Link href={"/"}>
                        <CustomText className="text-white flex items-center justify-center font-normal text-base absolute top-6 left-8"><MdOutlineArrowBack size={16} className="mr-1"/> Voltar</CustomText>
                    </Link>
					<Image alt="logo" src={logo} height={19} width={90} />
					<h1 className="text-[3rem] h-[3.25rem] text-white font-bold flex items-center">
						Bem vindo!
					</h1>
					<CustomText className="text-gray-300 text-[1.25rem] font-light mt-8 mb-2.5">
						Ainda não tem uma conta ?
					</CustomText>
					<Link href={"/signup"}>
                        <button
                            type="button"
                            className="text-[1.125rem] font-light text-white h-[3.625rem] w-[10.5rem] rounded-xl border border-white hover:bg-indigo-700/30"
                        >
                            Cadastrar
                        </button>
                    </Link>
				</div>

				<div className="w-full h-full flex flex-col items-center justify-center">
					<LoginUserForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
