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
        'footer-texture': "url('/img/footer-texture.jpg')",
        'faq-right': "url('/img/triangle-right.svg')",
        'faq-left': "url('/img/triangle-left.svg')",
      },
      fontFamily: {
        'caviar-dreams': ['CaviarDreams', 'sans-serif'],
        'logo': ['Times New Roman', 'serif']
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
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.horizontal-tb': {
          writingMode: 'horizontal-tb',
        },
        '.vertical-rl': {
          writingMode: 'vertical-rl'
        },
        '.vertical-lr': {
          writingMode: 'vertical-lr'
        },
        '.orientation-mixed': {
          'text-orientation': 'mixed'
        },
        '.orientation-upright': {
          'text-orientation': 'upright'
        }
      })
    })
  ],
}
export default config
