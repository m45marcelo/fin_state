"use client"
import { CardModalAddSubscription } from "./CardModalAddSubscription";
import { ModalBackground } from "../ModalBackground";

export const ModalAddSubscriptionCard = () => {
    return(
        <ModalBackground modalName="addSubscription">
            <CardModalAddSubscription/>
        </ModalBackground>
    )
}

