
import { Header } from "@/components/layout/Header";
import { ModalAddSubscriptionCard } from "@/components/ui/Modal/ModalAddSubscription/ModalAddSubscription";
import { ModalAuth } from "@/components/ui/Modal/ModalAuth/ModalAuth";
import { ModalDeleteTransaction } from "@/components/ui/Modal/ModalDeleteTransaction/ModalDeleteTransaction";
import { ModalEditSubscription } from "@/components/ui/Modal/ModalEditSubscription/ModalEditSubscription";

const Layout = ({ children }: { children: React.ReactNode}) => {
    return(
        <div className="w-full h-screen">
            <div className="flex flex-col justify-center items-center overflow-auto">
                <Header/>
                <main className="flex flex-col w-full max-w-[79.9375rem] items-center gap-[1.8125rem] justify-center">
                    {children}
                </main>
            </div>
            <ModalAuth/>
            <ModalAddSubscriptionCard/>
            <ModalDeleteTransaction/>
            <ModalEditSubscription/>
        </div>
    )
}

export default Layout;