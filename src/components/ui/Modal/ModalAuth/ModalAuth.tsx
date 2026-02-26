import { ModalBackground } from "../ModalBackground";
import { CardModalAuth } from "./CardModalAuth";

export const ModalAuth = () => {
	return (
		<ModalBackground modalName="authUser">
			<CardModalAuth />
		</ModalBackground>
	);
};
