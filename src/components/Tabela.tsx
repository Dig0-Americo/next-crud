import Cliente from "@/core/Cliente"
import { IconeEdit, IconeLixo } from "./Icone"

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteExluido || props.clienteSelecionado

    const rederizarCabecalho = () => {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }

    const redenrizarDados = () => {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id}
                    className={`${i % 2 == 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes ? redenrizarAcoes(cliente) : false}
                </tr>
            )
        })
    }

    const redenrizarAcoes = (cliente: Cliente) => {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
                    flex justify-center items-center 
                    text-green-700 rounded-full p-2 m-1
                    hover:bg-purple-50 
                `}>
                        {IconeEdit}
                    </button>

                ) : false}
                {props.clienteExluido ? (
                    <button onClick={() => props.clienteExluido?.(cliente)} className={`
                    flex justify-center items-center 
                    text-red-700 rounded-full p-2 m-1
                    hover:bg-purple-50 
                `}>
                        {IconeLixo}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
              text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {rederizarCabecalho()}
            </thead>
            <tbody>
                {redenrizarDados()}
            </tbody>
        </table>
    )
}