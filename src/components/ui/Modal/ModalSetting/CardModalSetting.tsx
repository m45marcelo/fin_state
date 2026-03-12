"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdClose, MdOutlineLogin, MdPhotoCamera } from "react-icons/md";
import { useAppDispatch } from "@/hooks";
import {
	useGetMeQuery,
	useLogoutUserMutation,
	userApi,
	useUpdateAvatarMutation,
} from "@/store/api/userApi";
import { closeModal } from "@/store/slices/modalSlice";
import imagePerfil from "../../../../../public/assets/images/image-user.png";
import { CustomButton } from "../../Button/CustomButton";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { FormModalSetting } from "./FormModalSetting";

export const CardModalSetting = () => {
	const dispatch = useAppDispatch();
	const { data } = useGetMeQuery();
	const [logout] = useLogoutUserMutation();
	const [image, setImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();

	useEffect(() => {
		if (data?.user?.avatarUrl) {
			setPreview(data.user.avatarUrl);
		} else {
			setPreview(imagePerfil.src);
		}
	}, [data]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setImage(file);
			setPreview(URL.createObjectURL(file));
		}
	};

		const handleUploadAvatar = async () => {
			if (!image) return;
		
			const formData = new FormData();
			formData.append("avatar", image);
		
			try {
				await updateAvatar(formData).unwrap();
			} catch (error) {
				console.error("Erro ao atualizar avatar", error);
			}
		};

	const handleLogout = async () => {
		await logout();
		dispatch(userApi.util.resetApiState());
		dispatch(closeModal());
		window.location.reload();
	};

	return (
		<div className="w-full max-w-[25.1875rem] rounded-2xl bg-white p-[1.875rem]">
			<div className="flex justify-between items-center text-center mb-[1.25rem]">
				<TitleCardH2 className="font-semibold text-lg">
					Configuração de perfil
				</TitleCardH2>
				<button
					type="button"
					onClick={() => {
						dispatch(closeModal());
					}}
					className="h-7 text-gray-400 hover:text-gray-600"
				>
					<MdClose className="text-2xl" />
				</button>
			</div>
			<div className="flex flex-col items-center w-full">
				<div className="flex h-[5.625rem] w-[5.625rem]">
					<div className="relative w-full h-full">
						{preview && (
							<Image
								alt="image perfil"
								src={preview}
								height={90}
								width={90}
								className="rounded-full h-[5.4375rem] w-[5.4375rem] border-[0.1875rem] border-blue-50"
							/>
						)}
						<label className="absolute top-0 rounded-full flex h-full w-full items-center justify-center cursor-pointer">
							<input
								onChange={handleFileChange}
								type="file"
								className="hidden"
							/>
						</label>
						<div className="absolute bottom-2 right-0">
							<MdPhotoCamera size={25} className="text-gray-400" />
						</div>
					</div>
				</div>
				<FormModalSetting functionUpdateImage={handleUploadAvatar}/>
				<div className=" flex items-center mt-[0.9375rem] w-full justify-between">
					<CustomButton
						type="button"
						title="Cancelar"
						onClick={() => {
							dispatch(closeModal());
						}}
						className="text-[0.9375rem] w-[10.375rem]  h-[2.375rem] bg-gray-200 hover:bg-gray-300 text-gray-800"
						isPrimary={false}
					/>
					<CustomButton
						onClick={() => handleLogout()}
						type="button"
						className="bg-red-500 text-[0.9375rem] w-[10.375rem] h-[2.375rem] hover:bg-red-600"
						isPrimary
						title="Sair"
						iconButton={MdOutlineLogin}
					/>
				</div>
			</div>
		</div>
	);
};
