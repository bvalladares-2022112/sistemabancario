import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:2656",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
  },
  (err) => Promise.reject(err)
);


export const loginRequest = async (credentials) => {
  try {
    return await apiClient.post('/innovabank/user/login', credentials)
  } catch (err) {
    return {
      error: true,
      err,
    }
  }
}

export const registerRequest = async (user) => {
  try {
    return await apiClient.post('/innovabank/user/register', user)
  } catch (err) {
    return {
      error: true,
      err,
    };
  }
}

export const registerAdminRequest = async (admin) => {
  try {
    return await apiClient.post('/innovabank/admin/register', admin)
  } catch (err) {
    return {
      error: true,
      err,
    }
  }
}

export const getProductsRequest = async () => {
  try {
      const response = await apiClient.get('/innovabank/product/getAllProducts')
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const addProductRequest = async (productData) => {
  try {
      const response = await apiClient.post('/innovabank/product/addProduct', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const deleteProductRequest = async (id) => {
  try {
      return await apiClient.delete(`/innovabank/product/deleteProduct/${id}`)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const updateProductkRequest = async (id, product) => {
  try {
      return await apiClient.put(`/innovabank/product/updateProduct/${id}`, product)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const getFavoritesRequest = async (productData) => {
  try {
      const response = await apiClient.get('/innovabank/favorite/allfavorites', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const deleteFavoriteRequest = async (id) => {
  try {
      return await apiClient.delete(`/innovabank/favorite/deletefavorite/${id}`)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const addFavoriteRequest = async (productData) => {
  try {
      const response = await apiClient.post('/innovabank/favorite/addfavorite', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const getAccountsRequest = async () => {
  try {
      const response = await apiClient.get('/innovabank/account/allaccounts')
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const createAccountRequest = async (productData) => {
  try {
      const response = await apiClient.post('/innovabank/account/addaccount', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const deleteAccountRequest = async (id) => {
  try {
      return await apiClient.delete(`/innovabank/account/deleteaccount/${id}`)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const getTransactionsRequest = async (productData) => {
  try {
      const response = await apiClient.get('/innovabank/transaction/getAll', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const deleteTransactionRequest = async (id) => {
  try {
      return await apiClient.delete(`/innovabank/transaction/delete/${id}`)
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}

export const addTransactionRequest = async (productData) => {
  try {
      const response = await apiClient.post('/innovabank/transaction/create', productData)
      return response.data
  } catch (err) {
      return {
          error: true,
          err
      }
  }
}