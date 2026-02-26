import { Link } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { MdAnalytics, MdDashboard, MdEventRepeat, MdReceiptLong, MdSavings } from "react-icons/md";

interface LinksState{
    links: Link[]
}

const initialState: LinksState = {
    links: [
        { name: 'Dashboard', href: '/', icon: MdDashboard },
        { name: 'Transações', href: '/transacoes', icon: MdReceiptLong },
        { name: 'Assinaturas', href: '/assinaturas', icon: MdEventRepeat },
        { name: 'Orçamentos', href: '/orcamentos', icon: MdSavings },
        { name: 'Análise', href: '/analise', icon: MdAnalytics}
    ]
}

const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {}
})

export default linksSlice.reducer