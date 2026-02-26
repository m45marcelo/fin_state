import { ModalBackground } from "../ModalBackground"
import { CardModalDeleteTransaction } from "./CardModalDeleteTransaction"

export const ModalDeleteTransaction = () => {
    return(
        <ModalBackground modalName="deleteTransaction">
            <CardModalDeleteTransaction/>
        </ModalBackground>
    )
}