import Logo from "../ui/Logo"
import { MenuItem } from "../ui/MenuItem"

const Sidebar = () => {
    return(
        <aside className="fixed h-screen flex-shrink-0 top-0 left-0 max-w-sidebar-width w-full bg-sidebar px-[1.375rem] py-[1.75rem] shadow-lg">
            <Logo />
            <MenuItem/>
        </aside>
    )
}

export default Sidebar