import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import ColecaoCliente from "@/firebase/db/ColecaoCliente";
import { useEffect, useState } from "react";

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    obterTodos()
  }, [])

  const obterTodos = () => {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')
    })
  }

  const clienteSelecionado = (cliente: Cliente) => {
    setCliente(cliente)
    setVisivel('form')
  }

  const clienteExluido = async (cliente: Cliente) => {
    await repo.ecluir(cliente)
    obterTodos()
  }

  const salvarCliente = async (cliente: Cliente) => {
    await repo.salvar(cliente)
    obterTodos()
  }

  const novoCliente = () => {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastre-se">
        {visivel === 'tabela' ? (
          <>
            <div className="flex justify-end">
              <Botao
                cor="green"
                className="mb-4"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExluido={clienteExluido}>
            </Tabela>
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            cancelado={() => setVisivel('tabela')} />
        )}
      </Layout>
    </div>
  )
}
