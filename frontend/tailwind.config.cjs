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
          "url('https://firebasestorage.googleapis.com/v0/b/ecommerce-website-7369e.appspot.com/o/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg?alt=media&token=57977edf-9d52-4a4d-80d2-7d0dcfaf0454')"
      }
    }
  },
  plugins: []
};
