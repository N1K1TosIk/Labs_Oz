const base = `${process.env.PUBLIC_URL ?? ''}/Images`;

export const IMG = {
  russki: `${base}/Russki_Bridge.jpg`,
  krim: `${base}/Krim_Bridge.jpg`,
  obuhovski: `${base}/Big_Obuhovski_Bridge.jpg`,
  amur: `${base}/Amur_Bridge.jpg`,
  president: `${base}/President_Bridge.jpg`,
  toliatti: `${base}/Toliatti_Bridge.jpg`,
  golden: `${base}/Vladivostok_De_Frize_Bridge.JPG`,
} as const;
