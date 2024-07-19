import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import {getAccountsRequest } from '../../../services/api'

export const useGetAllAccounts = () => {
    const [getAccounts, setGetAccounts] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    const getAllAccounts = useCallback(async () => {
        setIsFetching(true)
        setError(null)
        try {
            const response = await getAccountsRequest()
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las cuentas')
            } else if (Array.isArray(response)) {
                setGetAccounts(response)
            } else {
                setGetAccounts([])
                toast.error('Respuesta inesperada del servidor')
            }
        } catch (error) {
            toast.error('Error al obtener las cuentas')
        } finally {
            setIsFetching(false)
        }
    }, [])

    return {
        getAccounts,
        isFetching,
        error,
        getAllAccounts
    }
}