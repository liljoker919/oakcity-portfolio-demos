import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  outDir: './dist',
  vite: {
    resolve: {
      alias: {
        '@shared': path.resolve(__dirname, '../../shared')
      }
    }
  }
});
