import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port du serveur de développement
     proxy: {
    '/api': 'http://localhost:5000', // ou le port de votre backend
  },
  },
 
});