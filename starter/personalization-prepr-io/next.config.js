const { withCountryInfo } = require('./scripts/countries')

module.exports = withCountryInfo({
  images: {
    domains: ['flagcdn.com', 'demo-site-patterns.stream.prepr.io', process.env.PREPR_IMAGE_CDN],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // this will allow site to be framed under prepr.io for previewing.
          {
            key: 'Content-Security-Policy',
            value: 'frame-ancestors https://*.prepr.io https://prepr.io',
          },
        ],
      },
    ]
  }
})
