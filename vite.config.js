import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// El sitio corre en el puerto 5174 para no chocar con la app TAPE (5173).
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: { port: 5174 },
  preview: { port: 4174 },
})
