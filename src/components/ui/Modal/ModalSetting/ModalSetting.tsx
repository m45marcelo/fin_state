import { ModalBackground } from "../ModalBackground"
import { CardModalSetting } from "./CardModalSetting"


export const ModalEditSetting = () => {
    return(
        <ModalBackground modalName="editSetting">
            <CardModalSetting />
        </ModalBackground>
    )
}