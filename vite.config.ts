import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { Loader } from 'esbuild';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig(() => {
  const env = loadEnv(process.argv[2], process.cwd(), '');

  return {
    define: {
      'process.env.VIPE_APP_API_URL': JSON.stringify(env.VIPE_APP_API_URL),
    },
    plugins: [
      tsconfigPaths(),
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    optimizeDeps: {
      include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis', //<-- AWS SDK
        },
        loader: {
          '.js': 'jsx' as Loader,
        },
      },
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: './build',
    },
    resolve: {
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
  };
});
