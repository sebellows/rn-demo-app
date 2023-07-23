import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`,
  },
})
