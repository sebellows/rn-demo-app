import axios from 'axios'
import Constants from 'expo-constants'

const API_KEY = Constants?.manifest?.extra?.apiKey
const API_BASE_URL = Constants?.manifest?.extra?.apiBaseUrl

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
})
