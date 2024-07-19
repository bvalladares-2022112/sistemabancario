import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import { getProductsRequest } from '../../../services/api'

export const useGetAllProducts = () => {
    const [getProducts, setGetProducts] = useState([])
    const [isFetching, setIsFetching] = useState(false)

    const getAllProducts = useCallback(async () => {
        setIsFetching(true)
        try {
            const response = await getProductsRequest()
            if (response.error) {
                toast.error(response.err.message || 'Error al obtener los productos')
            } else {
                setGetProducts(response)
            }
        } catch (error) {
            toast.error('Error al obtener los productos')
        } finally {
            setIsFetching(false)
        }
    }, [])

    return {
        getProducts,
        isFetching,
        getAllProducts
    }
}