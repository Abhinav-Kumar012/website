import { defineConfig } from "vite";
import path from 'path';
// import viteCompression from 'vite-plugin-compression';
export default defineConfig(async ({ command, mode }) => {
  return {
    build: {
      cssCodeSplit: false,
      outDir: "build"
    },
    server: {
      host:"0.0.0.0",
      port:3000,
      strictPort: true,
      hmr: {
        clientPort: 443
      },
      fs: {
        strict: true,
        allow: [
          // Add custom allowed paths
          path.resolve(__dirname, 'public/'),
          path.resolve(__dirname, 'scripts/'),
          path.resolve(__dirname, 'templates/'),
          path.resolve(__dirname, 'index.html'),
          path.resolve(__dirname, 'settings.json'),
          path.resolve(__dirname, 'sitemap.xml'),
          path.resolve(__dirname, 'c1e17fc4d4194878b246934e279744f7.txt')
        ],
      },
    },
    optimizeDeps: {
      exclude: ['./settings.json']
    }//,
    // plugins: [
    //   viteCompression({
    //     algorithm: 'brotliCompress', // Use 'gzip' for Gzip compression
    //     threshold: 1024, // Only compress files larger than 1KB
    //     deleteOriginFile: false, // Keep original files
    //   })
    // ]
  };
});
