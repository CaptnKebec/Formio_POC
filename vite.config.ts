
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

//import fs from 'fs';
//import { VitePWA } from 'vite-plugin-pwa'

// const path = require('path')

// const baseFolder =
//     process.env.APPDATA !== undefined && process.env.APPDATA !== ''
//         ? `${process.env.APPDATA}/ASP.NET/https`
//         : `${process.env.HOME}/.aspnet/https`;

// //console.log(baseFolder);

// const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
// const certificateName = certificateArg ? certificateArg.groups?.value : "RCAPSAdmin.dashboard";

// if (!certificateName) {
//     console.error('Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.')
//     process.exit(-1);
// }

// const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
// const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// //console.log(certFilePath);

//let version = '0.0.0'
//lecture du package.json
//const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
//lecture de la version
//version = packageJson.version || 0;

export default defineConfig({

  server: {
    proxy: {
      '/api': {
        target: "https://hq-dev-formio-wa.azurewebsites.net",
        changeOrigin: true,
        secure: false,
        
        rewrite: (path) => path.replace(/^\/api/, ''),
        
          
      }

    },
  },
   
  plugins: [
   
    vue(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    'process.env': {},
    //injection de la version comme variable globale
    //ajouter "declare const appVersion:string" au fichier env.d.ts
    //appVersion: JSON.stringify(version)
  }
});




