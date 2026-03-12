"use client";
import "@/app/globals.css";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import {
	MdOutlineLogin,
} from "react-icons/md";
import { useGetMeQuery } from "@/store/api/userApi";
import imageUserLocal from "../../../public/assets/images/image-user.png";
import { CustomButton } from "../ui/Button/CustomButton";
import Logo from "../ui/Logo";
import { CustomText } from "../ui/TextComponents/CustomText";
import { MenuItem } from "../ui/MenuItem";
import Skeleton from "react-loading-skeleton";
import { useAppDispatch } from "@/hooks";
import { openModal } from "@/store/slices/modalSlice";
import { useEffect, useState } from "react";

// const links = [
// 	{ name: "Overview", href: "/", icon: MdDashboard },
// 	{ name: "Transações", href: "/transacoes", icon: MdReceiptLong },
// 	{ name: "Assinaturas", href: "/assinaturas", icon: MdEventRepeat },
// 	{ name: "Orçamentos", href: "/orcamentos", icon: MdSavings },
// 	{ name: "Análise", href: "/analise", icon: MdAnalytics },
// ];

export const Header = () => {
	const { data, isLoading } = useGetMeQuery();
	const dispatch = useAppDispatch();
	const [imageUser, setImageUser] = useState<StaticImageData | string>(imageUserLocal)

	useEffect(() => {
		if(data && data.user.avatarUrl){
				setImageUser(data.user.avatarUrl)
		}
	}, [data])

	return (
		<header className="flex bg-white justify-center h-[3.625rem] py-[0.625rem] w-full mb-[1.25rem] shadow-sm">
			<div className="w-full max-w-[79.9375rem] flex justify-between">
				<div className="flex items-center gap-2">
					<Logo />
					<MenuItem/>
				</div>
				{data?.user ? (
					<button onClick={() => dispatch(openModal("editSetting"))} type="button" className="flex items-center">
						<Image
							alt="user icon"
							height={32}
							width={32}
							className="rounded-full mr-3"
							src={imageUser}
						/>
						<CustomText className="text-[0.8125rem] font-medium text-gray-700">
							{data.user.name}
						</CustomText>
					</button>
				) : (
					isLoading ? (
						<Skeleton height={"100%"} width={150}/>
					):(
						<Link href={"/login"}>
						<CustomButton
							type="button"
							title="Entrar"
							isPrimary
							iconButton={MdOutlineLogin}
							className="h-[2.375rem] bg-indigo-500 hover:bg-indigo-600"
						/>
					</Link>
					)
				)}
			</div>
		</header>
	);
};
