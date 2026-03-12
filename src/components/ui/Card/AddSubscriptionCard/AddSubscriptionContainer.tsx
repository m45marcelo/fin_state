"use client";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useAppDispatch } from "@/hooks";
import { useGetAllSubscriptionsQuery } from "@/store/api/subscriptionApi";
import { useGetMeQuery } from "@/store/api/userApi";
import { openModal } from "@/store/slices/modalSlice";
import { CustomButton } from "../../Button/CustomButton";
import { CustomText } from "../../TextComponents/CustomText";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { NotLogin } from "../HistoryTransactionsCard/NotLogin";
import { AddSubscriptionList } from "./AddSubscriptionList";
import { NotSubscription } from "./NotSubscription";

export const AddSubscriptionContainer = () => {
	const { data: userData, isLoading: loadingGetMe } = useGetMeQuery();
	const { data, isLoading: loadingAllSubscriptions } = useGetAllSubscriptionsQuery();
	const dispatch = useAppDispatch();

	function handleModal() {
		if (!userData) {
			dispatch(openModal("authUser"));
		} else dispatch(openModal("addSubscription"));
	}

	if (loadingGetMe || loadingAllSubscriptions) {
		return (
			<div className="bg-white flex flex-col items-center p-[1.3125rem] h-full w-full max-w-[52.9375rem] shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
				<div className="w-full flex items-center mb-4 justify-between">
					<TitleCardH2 className="block text-base">
						Assinaturas e Despesas Recorrentes
					</TitleCardH2>
					{data ? (
						<Link href={"/transactions"}>
							<CustomText className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer">
								Ver mais
							</CustomText>
						</Link>
					) : (
						<button
							onClick={() => dispatch(openModal("authUser"))}
							type="button"
							className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer"
						>
							Ver mais
						</button>
					)}
				</div>
					{
						[1, 2, 3, 4].map((item) => (
							<div key={item} className="w-full">
								<Skeleton height={80} width={"100%"} />
							</div>
						))
					}
			</div>
		);
	}

	if (!userData) {
		return (
			<div className="bg-white flex flex-col items-center p-[1.3125rem] h-full w-full max-w-[52.9375rem] shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
				<div className="w-full flex items-center mb-4 justify-between">
					<TitleCardH2 className="block text-base">
						Assinaturas e Despesas Recorrentes
					</TitleCardH2>
					{data ? (
						<Link href={"/transactions"}>
							<CustomText className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer">
								Ver mais
							</CustomText>
						</Link>
					) : (
						<button
							onClick={() => dispatch(openModal("authUser"))}
							type="button"
							className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer"
						>
							Ver mais
						</button>
					)}
				</div>
					<NotLogin />
			</div>
		);
	}

	return (
		<div className="bg-white flex flex-col justify-center items-center p-[1.3125rem] h-full w-full max-w-[52.9375rem] shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
			<div className="w-full flex items-center mb-4 justify-between">
				<TitleCardH2 className="block text-[16px]">
					Assinaturas e Despesas Recorrentes
				</TitleCardH2>
				{data ? (
					<Link href={"/transactions"}>
						<CustomText className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer">
							Ver mais
						</CustomText>
					</Link>
				) : (
					<button
						onClick={() => dispatch(openModal("authUser"))}
						type="button"
						className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer"
					>
						Ver mais
					</button>
				)}
			</div>

			{data && data.subscriptions.length > 0 ? (
				<AddSubscriptionList />
			) : (
				<NotSubscription />
			)}
			<CustomButton
				onClick={() => handleModal()}
				type="button"
				iconButton={MdAdd}
				title="Nova Assinatura"
				isPrimary
				className="text-[0.8125rem] h-[2.375rem] w-full bg-indigo-500  hover:bg-indigo-600"
			/>
		</div>
	);
};
