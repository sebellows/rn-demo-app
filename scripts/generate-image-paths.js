const util = require('util')
const fs = require('fs/promises')

// Yelp rating star image is different for half stars with a `_half` suffix,
// We can add the suffix by conditionally checking if the rating is a float
// or not.
const isInt = n => n % 1 === 0

// Map of mobile operating systems and their named pixel ratios
const ops = {
  android: ['hdpi', 'xhdpi', 'xxhdpi'],
  ios: ['', '@2x', '@3x'],
}
// Yelp ratings
const ratings = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
// Image assets base URL path
const baseUrl = './static/yelp_stars'

// Store the asset URL paths to a map structured like so:
// `{ [os]: { [dpi]: { [rating]': imagePathURL } } }`
const album = { android: {}, ios: {} }

let ratingPath = ''
let suffix = ''
let osImages = {}
let isAndroid = false

Object.keys(ops).forEach(os => {
  isAndroid = os === 'android'
  osImages = album[os]

  ops[os].forEach(dpi => {
    if (!osImages[dpi]) osImages[dpi] = {}

    ratings.forEach(rating => {
      suffix = isInt(rating) ? '' : '_half'
      ratingPath = Math.floor(rating) + suffix

      osImages[dpi][`${rating}`] = isAndroid
        ? `${baseUrl}/android/drawable-${dpi}/large/stars_large_${ratingPath}.png`
        : `${baseUrl}/web_and_ios/large/large_${ratingPath}${dpi}.png`
    })
  })
})

async function generate() {
  try {
    const content = `export const yelpStars = ${util.inspect(album, {
      showHidden: false,
      compact: false,
      depth: null,
    })}`
    await fs.writeFile('./src/static/yelp-stars.ts', content)
  } catch (err) {
    console.log(err)
  }
}

generate()
