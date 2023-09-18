import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { webfontDownload } from 'vite-plugin-webfont-dl';

export default defineConfig({
  base: '/DRTest/',
  plugins: [
    react(),
    webfontDownload([
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&display=swap',
    ]),
  ],
});
