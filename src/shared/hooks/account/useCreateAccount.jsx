import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { createAccountRequest } from '../../../services/api'

export const useCreateAccount = () => {
    const [createAccount, setCreateAccount] = useState(false)

    const registerAccount = async (productData) => {
        setCreateAccount(true);
        try {
            const response = await createAccountRequest(productData)
            if (response.error) {
                throw new Error(response.error)
            }
            toast.success('Cuenta guardada')
        } catch (error) {
            toast.error('No se pudo guardar la cuenta')
        } finally {
            setCreateAccount(false)
        }
    }

    return {
        registerAccount,
        createAccount,
    }
}