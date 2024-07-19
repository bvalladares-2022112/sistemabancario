import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { addProductRequest } from '../../../services/api'

export const useAddProduct = () => {
    const [addProduct, setAddProduct] = useState(false)
  
    const registerProduct = async (productData) => {
      setAddProduct(true);
      try {
        const response = await addProductRequest(productData)
        if (response.error) {
          throw new Error(response.error)
        }
        toast.success('Producto guardado')
      } catch (error) {
        toast.error('No se pudo guardar el producto')
      } finally {
        setAddProduct(false)
      }
    }
  
    return {
      registerProduct,
      addProduct,
    }
  }