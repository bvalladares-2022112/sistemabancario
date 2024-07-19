import { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteProductRequest } from '../../../services/api'

export const useDeleteProduct = () => {
    const [error, setError] = useState(null);

    const deleteProduct = async (id) => {
        try {
            const response = await deleteProductRequest(id)
            if (response.error) {
                setError('Error al eliminar el producto: ' + response.err.message)
                toast.error('Error al eliminar el producto')
                return false
            } else {
                toast.success('Producto eliminado correctamente')
                return true
            }
        } catch (error) {
            setError('Error al eliminar el producto: ' + error.message)
            toast.error('Error al eliminar el producto')
            return false
        }
    }
    return {
        deleteProduct, error, setError
    }
}