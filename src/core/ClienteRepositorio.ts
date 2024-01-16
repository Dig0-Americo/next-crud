import Cliente from "@/core/Cliente";

export default interface ClienteRepositorio{
    salvar(cliente: Cliente): Promise<Cliente>
    ecluir(cliente: Cliente): Promise<void>
    obterTodos(): Promise<Cliente[]>
}