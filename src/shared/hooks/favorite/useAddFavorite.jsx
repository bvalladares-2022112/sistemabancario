import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addFavoriteRequest } from '../../../services/api'

export const useAddFavorite = () => {
    const [addFavorite, setAddFavorite] = useState(false)

    const registerFavorite = async (productData) => {
        setAddFavorite(true);
        try {
            const response = await addFavoriteRequest(productData)
            if (response.error) {
                throw new Error(response.error)
            }
            toast.success('Cuenta guardada correctamente')
        } catch (error) {
            toast.error('No se pudo guardar la cuenta')
        } finally {
            setAddFavorite(false)
        }
    }

    return {
        registerFavorite,
        addFavorite,
    }
}