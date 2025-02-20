import { useQueryClient } from "@tanstack/react-query";

export default function AdminNavigation() {

    const queryCliente = useQueryClient()

    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryCliente.invalidateQueries({queryKey: ['user']})
    }

    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
}
