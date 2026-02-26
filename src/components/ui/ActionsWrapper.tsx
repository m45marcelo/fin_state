import { AddSubscriptionContainer } from "./Card/AddSubscriptionCard/AddSubscriptionContainer";
import { AddTransactionContainer } from "./Card/AddTransactionCard/AddTransactionContainer";

export const ActionsWrapper = () => {
    return (
        <div className="w-full h-[26.25rem] flex gap-[1.3125rem] justify-center">
            <AddTransactionContainer />
            <AddSubscriptionContainer />
        </div>
    );
};
