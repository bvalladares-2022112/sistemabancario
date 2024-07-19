import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteFavoriteRequest } from '../../../services/api'

export const useDeleteFavorite = () => {
    const [error, setError] = useState(null);

    const deleteFavorite = async (id) => {
        try {
            const response = await deleteFavoriteRequest(id)
            if (response.error) {
                setError('Error al eliminar la cuenta: ' + response.err.message)
                toast.error('Error al eliminar la cuenta')
                return false
            } else {
                toast.success('Cuenta eliminada correctamente')
                return true
            }
        } catch (error) {
            setError('Error al eliminar la cuenta: ' + error.message)
            toast.error('Error al eliminar la cuenta')
            return false
        }
    }
    return {
        deleteFavorite, error, setError
    }
}