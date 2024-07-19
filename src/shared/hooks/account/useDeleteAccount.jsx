import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteAccountRequest } from '../../../services/api';

export const useDeleteAccount = () => {
    const [error, setError] = useState(null);

    const deleteAccount = async (id) => {
        try {
            const response = await deleteAccountRequest(id)
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
        deleteAccount, error, setError
    }
}