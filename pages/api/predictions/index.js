const API_HOST = process.env.REPLICATE_API_HOST || "https://api.replicate.com";
const addBackgroundToPNG = require("lib/add-background-to-png");

export default async function handler(req, res) {
  // remnove null and undefined values
  req.body = Object.entries(req.body).reduce(
    (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );

  if (req.body.mask) {
    req.body.mask = addBackgroundToPNG(req.body.mask);
  }

  const body = JSON.stringify({
    // Pinned to a specific version of Stable Diffusion, fetched from:
    // https://replicate.com/stability-ai/stable-diffusion
    // version: "be04660a5b93ef2aff61e3668dedb4cbeb14941e62a3fd5998364a32d613e35e", //original
    // version: "8abccf52e7cba9f6e82317253f4a3549082e966db5584e92c808ece132037776",
    // version: "0827b64897df7b6e8c04625167bbb275b9db0f14ab09e2454b9824141963c966",
    // version: "e5a34f913de0adc560d20e002c45ad43a80031b62caacc3d84010c6b6a64870c", //inpainting
    version: "e490d072a34a94a11e9711ed5a6ba621c3fab884eda1665d9d3a282d65a21180", //runwayML model
    input: req.body,
    // prompt_strength: 0.6,
  });

  const response = await fetch(`${API_HOST}/v1/predictions`, {
    method: "POST",
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    console.log(error);
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // change this to a limit of your file size
    },
  },
};
