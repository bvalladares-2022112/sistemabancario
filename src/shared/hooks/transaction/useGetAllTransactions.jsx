import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import { getTransactionsRequest } from '../../../services/api'

export const useGetAllTransactions = () => {
    const [getTransactions, setGetTransactions] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    const getAllTransactions = useCallback(async () => {
        setIsFetching(true)
        setError(null)
        try {
            const response = await getTransactionsRequest()
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las transacciones')
            } else if (Array.isArray(response)) {
                setGetTransactions(response)
            } else {
                setGetTransactions([])
                toast.error('Respuesta inesperada del servidor')
            }
        } catch (error) {
            toast.error('Error al obtener las transacciones')
        } finally {
            setIsFetching(false)
        }
    }, [])

    return {
        getTransactions,
        isFetching,
        error,
        getAllTransactions
    }
}