import { useState } from 'react'
import toast from 'react-hot-toast'
import { updateProductkRequest } from '../../../services/api'

export const useUpdateProduct = () => {
    const [updatedProduct, setUpdatedProduct] = useState(null)

    const updateProduct = async (id, product) => {
        const response = await updateProductkRequest(id, product)
        if (response.error) {
            toast.error(
                response?.err?.response?.data?.message ||
                'Error al actualizar el producto'
            )
        }
        setUpdatedProduct(response.data)
        toast.success('Actualizado correctamente')
    }
    return {
        updatedProduct,
        isFetching: !updateProduct,
        updateProduct
    }
}