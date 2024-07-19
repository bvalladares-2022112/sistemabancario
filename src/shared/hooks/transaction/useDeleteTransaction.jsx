import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteTransactionRequest } from '../../../services/api'
export const useDeleteTransaction = () => {
    const [error, setError] = useState(null);

    const deleteTransaction = async (id) => {
        try {
            const response = await deleteTransactionRequest(id)
            if (response.error) {
                setError('Error al eliminar la transacción: ' + response.err.message)
                toast.error('Error al eliminar la transacción')
                return false
            } else {
                toast.success('Transacción eliminada correctamente')
                return true
            }
        } catch (error) {
            setError('Error al eliminar la transacción: ' + error.message)
            toast.error('Error al eliminar la transacción')
            return false
        }
    }
    return {
        deleteTransaction, error, setError
    }
}