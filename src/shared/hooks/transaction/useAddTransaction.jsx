import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addTransactionRequest } from '../../../services/api'

export const useAddTransaction = () => {
    const [addTransaction, setAddTransaction] = useState(false)

    const registerTransaction = async (productData) => {
        setAddTransaction(true);
        try {
            const response = await addTransactionRequest(productData)
            if (response.error) {
                throw new Error(response.error)
            }
            toast.success('Transacción guardada correctamente')
        } catch (error) {
            toast.error('No se pudo guardar la transacción correctamente')
        } finally {
            setAddTransaction(false)
        }
    }

    return {
        registerTransaction,
        addTransaction,
    }
}