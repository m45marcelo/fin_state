"use client";
import clsx from "clsx";
import { type JSX, useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { LuChevronsLeftRightEllipsis } from "react-icons/lu";
import {
	MdCategory,
	MdDelete,
	MdDirectionsBus,
	MdEdit,
	MdHome,
	MdLocalGroceryStore,
	MdLocalHospital,
	MdMovie,
	MdNotificationImportant,
	MdSchool,
} from "react-icons/md";
import type { Subscription } from "@/domain/entities/Subscription";
import { useAppDispatch } from "@/hooks";
import {
	useUpdateSubscriptionMutation,
} from "@/store/api/subscriptionApi";
import { openModal } from "@/store/slices/modalSlice";
import { setSelectedTransaction } from "@/store/slices/selectedTransactionSlice";
import type { StatusSubscription } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { CustomText } from "../../TextComponents/CustomText";

interface AddSubscriptionItemListProps {
	subscription: Subscription;
}
export const AddSubscriptionItemList: React.FC<
	AddSubscriptionItemListProps
> = ({ subscription }) => {
	const [updateSubscription] = useUpdateSubscriptionMutation();
	const dispatch = useAppDispatch();
	const [statusSubscription, setStatusSubscription] =
		useState<StatusSubscription>(subscription.status);
	async function handleChangeStatusSubscription() {
		try {
			const newStatus: StatusSubscription =
				statusSubscription === "Pendente" ? "Pago" : "Pendente";

			setStatusSubscription(newStatus);

			await updateSubscription({
				...subscription,
				status: newStatus,
			}).unwrap();

			dispatch(
				setSelectedTransaction({
					...subscription,
					status: newStatus,
				}),
			);
		} catch (err) {
			console.error(
				"Ocorreu um erro ao tentar mudar o status da assinatura",
				err,
			);
		}
	}

	function handleChangeModal() {
		dispatch(setSelectedTransaction(subscription));
		dispatch(openModal("editTransaction"));
	}

	function handleDeleteSubscription() {
		dispatch(openModal("deleteTransaction"));
		dispatch(
			setSelectedTransaction({
				...subscription,
				type: "subscription",
			}),
		);
	}

	let ItemIcom: JSX.Element | null = null;
	if (subscription.category === "Supermercado")
		ItemIcom = <MdLocalGroceryStore size={20} className="text-green-600" />;
	if (subscription.category === "Entretenimento")
		ItemIcom = <MdMovie size={20} className="text-blue-600" />;
	if (subscription.category === "Vestuário")
		ItemIcom = <FaTshirt size={20} className="text-yellow-600" />;
	if (subscription.category === "Educação")
		ItemIcom = <MdSchool size={20} className="text-violet-600" />;
	if (subscription.category === "Transporte")
		ItemIcom = <MdDirectionsBus size={20} className="text-indigo-600" />;
	if (subscription.category === "Moradia")
		ItemIcom = <MdHome size={20} className="text-pink-600" />;
	if (subscription.category === "Saúde")
		ItemIcom = <MdLocalHospital size={20} className="text-red-600" />;
	if (subscription.category === "Outros")
		ItemIcom = (
			<LuChevronsLeftRightEllipsis size={20} className="text-slate-600" />
		);

	return (
		<li className="h-[80px] px-[0.625rem] w-full bg-gray-50 rounded-lg flex items-center">
			<div className="w-full h-full flex justify-between">
				<div className="flex items-center">
					<div
						className={clsx(
							" w-[2.1875rem] h-[2.5625rem] rounded-full flex items-center justify-center mr-4",
							{
								"bg-blue-100": subscription.category === "Entretenimento",
								"bg-violet-100": subscription.category === "Educação",
								"bg-green-100": subscription.category === "Moradia",
								"bg-yellow-100": subscription.category === "Vestuário",
								"bg-pink-100": subscription.category === "Moradia",
								"bg-red-100": subscription.category === "Saúde",
								"bg-slate-100": subscription.category === "Outros",
							},
						)}
					>
						{ItemIcom}
					</div>
					<div className="flex flex-col">
						<CustomText className="text-[0.9375rem] font-medium text-gray-800">
							{subscription.description}
						</CustomText>

						<div className="flex items-center">
							<MdCategory size={14} className="text-gray-400 mr-1" />
							<CustomText className="text-[13px] text-gray-500 flex items-center ">
								{subscription.category}
							</CustomText>
						</div>

						<div className="flex items-center">
							<MdNotificationImportant
								size={14}
								className="text-yellow-500 mr-1"
							/>
							<CustomText className="text-[13px] text-gray-500 flex items-center ">
								Próximo Pagamento:{" "}
								{new Date(subscription.nextPay).toISOString().split("T")[0]}
							</CustomText>
						</div>
					</div>
				</div>

				<div className="flex gap-4 items-center">
					<CustomText className="text-sm font-medium text-red-600 w-auto">
						{formatCurrency(subscription.value)}
					</CustomText>
					<button
						type="button"
						onClick={() => handleChangeStatusSubscription()}
						className={clsx(
							"h-[1.9375rem] transition-all duration-400 ease-in-out w-[8rem] overflow-hidden flex justify-center relative items-center gap-1 rounded-xl",
							{
								"bg-yellow-100": statusSubscription === "Pendente",
								"bg-green-100": statusSubscription === "Pago",
							},
						)}
					>
						<CustomText
							className={clsx(
								`
                            text-[0.6875rem] absolute left-2 transition-all duration-400 ease-in py-1 px-2 cursor-pointer font-medium bg-[#ffff] rounded-xl shadow-[0_2px_4px_rgba(0,_0,_0,_0.1)]`,
								{
									"text-yellow-600 translate-x-0":
										statusSubscription === "Pendente",
									"text-green-600 translate-x-[70px]":
										statusSubscription === "Pago",
								},
							)}
						>
							{statusSubscription}
						</CustomText>
						<CustomText className="text-[0.6875rem] text-gray-400 py-1 px-2 cursor-pointer font-medium rounded-xl">
							Pendente
						</CustomText>
						<CustomText className="text-[0.6875rem] text-gray-400 py-1 px-2 cursor-pointer font-medium rounded-xl">
							Pago
						</CustomText>
					</button>
					<div>
						<button
							onClick={() => handleChangeModal()}
							type="button"
							className="text-gray-400 hover:text-gray-600"
						>
							<MdEdit size={22} />
						</button>

						<button
							onClick={() => handleDeleteSubscription()}
							type="button"
							className="text-gray-400 ml-2 hover:text-red-600"
						>
							<MdDelete size={22} />
						</button>
					</div>
				</div>
			</div>
		</li>
	);
};
