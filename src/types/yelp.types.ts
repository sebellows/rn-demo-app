export namespace Yelp {
  export interface Query {
    businesses: Business[]
    total: number
    region: Region
  }

  export interface Business {
    id: string
    alias: string
    name: string
    imageURL: string
    isClosed: boolean
    url: string
    reviewCount: number
    categories: Category[]
    rating: number
    coordinates: Coordinates
    transactions: Transaction[]
    price?: Price
    location: Location
    phone: string
    displayPhone: string
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
    zipCode: string
    country: string
    state: string
    displayAddress: string[]
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
