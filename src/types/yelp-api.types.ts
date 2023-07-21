export namespace YelpApi {
  export interface Query {
    businesses: Business[]
    total: number
    region: Region
  }

  export interface Business {
    id: string
    alias: string
    name: string
    image_url: string
    is_closed: boolean
    url: string
    review_count: number
    categories: Category[]
    rating: number
    coordinates: Coordinates
    transactions: Transaction[]
    price?: Price
    location: Location
    phone: string
    display_phone: string
    distance: number
  }

  export interface Category {
    alias: string
    title: string
  }

  export interface Location {
    address1: string
    address2: string | null
    address3: string | null
    city: string
    zip_code: string
    country: string
    state: string
    display_address: string[]
  }

  export enum Price {
    Cheap = '$',
    Moderate = '$$',
    Expensive = '$$$',
  }

  export enum Transaction {
    Delivery = 'delivery',
    Pickup = 'pickup',
  }

  export interface Region {
    center: Coordinates
  }

  export interface Coordinates {
    latitude: number
    longitude: number
  }
}
