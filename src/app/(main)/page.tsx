import { ActionsWrapper } from "@/components/ui/ActionsWrapper";
import { CardInfoWrapper } from "@/components/ui/Card/CardInfo/CardInfoWrapper";
import { HistoryTransactionsContainer } from "@/components/ui/Card/HistoryTransactionsCard/HistoryTransactionContainer";

const Overview = () => {
    return (
        <>
            <CardInfoWrapper />
            <ActionsWrapper />
            <HistoryTransactionsContainer/>
        </>
    );
};

export default Overview;
