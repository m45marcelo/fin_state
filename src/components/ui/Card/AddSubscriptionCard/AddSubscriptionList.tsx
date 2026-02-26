"use client"
import { useGetAllSubscriptionsQuery } from "@/store/api/subscriptionApi";
import { AddSubscriptionItemList } from "./AddSubscriptionItemList";

export const AddSubscriptionList = () => {
	const { data } = useGetAllSubscriptionsQuery();

	return (
		<ul className="h-[18.75rem] w-full flex flex-col gap-[0.625rem] overflow-y-auto">
			{data?.subscriptions.map((item) => (
				<AddSubscriptionItemList key={item.id} subscription={item} />
			))}
		</ul>
	);
};
