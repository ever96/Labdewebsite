# LabDE · sitio web

Sitio del Laboratorio de Desarrollo Económico. Todo el sitio está en `src/App.jsx` (componentes y estilos); paleta negro, gris y blanco, con una red de partículas animada de fondo (respeta «reducir movimiento»).

```sh
npm install
npm run dev        # http://localhost:5174
npm run build      # sitio estático en dist/
```

## Producción (Vercel)

El sitio se publica en `www.labdesarrollo.lat`. TAPE (repo `tape-saas`, proyecto de Vercel `tape-saas`) se sirve en el mismo dominio bajo `/tape`: `vercel.json` reescribe `/tape/*` al proyecto de TAPE. Si cambia la dirección de ese proyecto, actualizarla en `vercel.json`.

En desarrollo, «Probar TAPE» apunta a `http://127.0.0.1:5173/` (o a `VITE_TAPE_URL`).

Correo de contacto: labdepy@gmail.com (constante `CONTACTO` de `src/App.jsx`).
