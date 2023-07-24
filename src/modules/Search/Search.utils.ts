/**
 * Yelp records distance in meters, so for an approximate result, multiply the length
 * value roughly by ~1609.34.
 *
 * @param distance - Distance in meters.
 * @returns Distance in approximate miles.
 */
export const distanceMetersToMiles = (distance: number) => Number((distance / 1609.34).toFixed(1))
