import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { colors } from '@mui/material'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),tailwindcss(),
  ],
  server:{
    port:3000,
  },
  theme:{
    extends:{
      colors:{
        "primary-color":"#00927c",
        "secondary-color":"#EAF0F1"
      },
      keyframes: {
        'pulse-light': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        }
      },
      animation: {
        'pulse-light': 'pulse-light 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    }
  },
  
})



