/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#709dff',
          200: '#5651e5'
        }
      },
      fontFamily: {
        redditsans: ['Reddit Sans', 'sans-serif']
      },
      height: {
        carousel: 'calc(100vh - 104px)' // 104 => 26*0.25*16
      },
      backgroundImage: {
        login:
          "url('https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/clark-street-mercantile-P3pI6xzovu0-unsplash-min.webp?alt=media&token=817b027c-cbbe-4308-8c40-9a9f7455ba36')"
      }
    }
  },
  plugins: []
};
