import type { Config } from 'tailwindcss'

const config: Config = {



  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    screens: {
      'sm': { 'min': '320px', 'max': '639px' },
      'md': { 'min': '640px', 'max': '767px' },
      'lg': { 'min': '768px', 'max': '1023px' },
      'xl': { 'min': '1024px', 'max': '1279px' },
      '2xl': { 'min': '1280px' },
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
