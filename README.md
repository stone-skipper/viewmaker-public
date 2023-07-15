# Viewmaker



https://github.com/stone-skipper/viewmaker-public/assets/48980449/3ffdd2a2-1655-487c-b02d-beea8fdf2acd




This is a prototype to test inpainting with [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion) based on the camera input from a smartphone.

Try it out at [viewmaker.vercel.app](https://viewmaker.vercel.app/)

Reach out via [Twitter](https://twitter.com/@smee_leee) or [Instagram](https://instagram.com/stone.skipper)


## How it works

- The credit goes to the [Template](https://vercel.com/templates/next.js/inpainter-stable-diffusion) on Vercel.

- [Replicate](https://replicate.com/), a platform for running machine learning models in the cloud.
- [Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion), an open-source text-to-image generation model.
- Next.js [server-side API routes](pages/api) for talking to the Replicate API
- Next.js React components for the inpainting GUI
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for Icons
- [Framer Motion](https://www.framer.com/motion/?utm_source=google&utm_medium=adwords&utm_campaign=TW-WW-All-GS-UA-Traffic-20190326-Brand.Bmm_&gad=1&gclid=CjwKCAjw5MOlBhBTEiwAAJ8e1hhKbN4IjDWIoUazBhf7pdsceuPP9OT0UpZ3MFpF_jHEMK2iqDAArhoCOdgQAvD_BwE) for some motions

## Development

Prerequisites:

1. Recent version of Node.js
2. [Replicate API token](https://replicate.com/account)

Set your Replicate API token in your environment. You can change it from '.env' file in the root directory.

```
REPLICATE_API_TOKEN=<your-token-here>
```

Then install dependencies and run the server:

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
