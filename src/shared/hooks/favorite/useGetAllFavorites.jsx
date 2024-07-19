import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import { getFavoritesRequest } from '../../../services/api'

export const useGetAllFavorites = () => {
    const [getFavorites, setGetFavorites] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [error, setError] = useState(null)

    const getAllFavorites = useCallback(async () => {
        setIsFetching(true)
        setError(null)
        try {
            const response = await getFavoritesRequest()
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener las cuentas favoritas')
            } else if (Array.isArray(response)) {
                setGetFavorites(response)
            } else {
                setGetFavorites([])
                toast.error('Respuesta inesperada del servidor')
            }
        } catch (error) {
            toast.error('Error al obtener las cuentas favoritas')
        } finally {
            setIsFetching(false)
        }
    }, [])

    return {
        getFavorites,
        isFetching,
        error,
        getAllFavorites
    }
}