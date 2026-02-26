"use client";

import toast from "react-hot-toast";
import { MdWarning } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useDeleteSubscriptionMutation } from "@/store/api/subscriptionApi";
import { closeModal } from "@/store/slices/modalSlice";
import { CustomButton } from "../../Button/CustomButton";
import { CustomText } from "../../TextComponents/CustomText";

export const CardModalDeleteTransaction = () => {
	const [deleteSubscription] = useDeleteSubscriptionMutation();
	const dispatch = useAppDispatch();

	const selectedTransaction = useAppSelector(
		(state) => state.selectedSubscription.subscription
	);

	if (!selectedTransaction) return null;
    const {id, type, description} = selectedTransaction;

	async function handleDeleteSubscription() { 
		try {
			await deleteSubscription({
				id,
				type,
			}).unwrap();

			toast.success("Transação excluída com sucesso");
			dispatch(closeModal());
		} catch (err) {
			toast.error("Ocorreu um erro ao tentar excluir essa transação");
			dispatch(closeModal());
		}
	}

	return (
		<div className="h-[14.5rem] w-full max-w-[25.25rem] flex flex-col items-center justify-center p-[1.375rem] rounded-2xl bg-white">
			<div className="rounded-full bg-red-100 w-[2.75rem] h-[2.75rem] flex justify-center items-center mb-[0.9375rem]">
				<MdWarning className="text-[1.375rem] text-red-600" />
			</div>

			<CustomText className="text-[1.125rem] text-gray-900 font-semibold mb-[0.625rem]">
				Excluir Assinatura
			</CustomText>

			<CustomText className="text-xs font-medium text-gray-500 text-center max-w-[21.25rem] mb-6">
				Tem certeza que deseja excluir a assinatura{" "}
				<strong>{description}</strong>? Esta ação não pode ser desfeita.
			</CustomText>

			<div className="flex w-full justify-between">
				<CustomButton
					onClick={() => dispatch(closeModal())}
					stylesButton="h-[2.5rem] w-[10.875rem] text-[0.875rem]"
					type="button"
					title="Cancelar"
					isPrimary={false}
				/>
				<CustomButton
					onClick={handleDeleteSubscription}
					stylesButton="h-[2.5rem] w-[10.875rem] text-[0.875rem] bg-red-500 hover:bg-red-600"
					type="button"
					title="Excluir"
					isPrimary
				/>
			</div>
		</div>
	);
};
