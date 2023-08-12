import type { Config } from 'tailwindcss'

const config: Config = {



  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    screens: {
      'sm': '320px',

      'laptop': '1024px',

      'desktop': '1280px',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        'custom': ['ubuntu-mono', 'Ubuntu', 'sans-serif'],
      },
      container: {
        center: true,
      },
    },
  },


  plugins: [],
}
export default config
