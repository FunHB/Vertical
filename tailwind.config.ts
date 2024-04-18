import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer-texture': "url('/img/footer-texture.avif')",
        'faq-right': "url('/img/triangle-right.svg')",
        'faq-left': "url('/img/triangle-left.svg')",
      },
      animation: {
        'bounce-slow': 'bounce 2s linear infinite',
      },
      aspectRatio: {
        '4/3': '4/3',
        '6/7': '6/7'
      }
    },
  },
  plugins: [],
}
export default config
