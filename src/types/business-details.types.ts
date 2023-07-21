export interface BusinessDetails {
  id: string
  alias: string
  name: string
  image_url: string
  is_claimed: boolean
  is_closed: boolean
  url: string
  phone: string
  display_phone: string
  review_count: number
  categories: Category[]
  rating: number
  location: Location
  coordinates: Coordinates
  photos: string[]
  price: string
  hours: Hour[]
  transactions: any[]
}

interface Category {
  alias: string
  title: string
}

interface Coordinates {
  latitude: number
  longitude: number
}

interface Hour {
  open: Open[]
  hours_type: string
  is_open_now: boolean
}

interface Open {
  is_overnight: boolean
  start: string
  end: string
  day: number
}

interface Location {
  address1: string
  address2: null
  address3: null
  city: string
  zip_code: string
  country: string
  state: string
  display_address: string[]
  cross_streets: string
}
