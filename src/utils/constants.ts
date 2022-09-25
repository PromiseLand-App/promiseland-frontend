import { chain } from 'wagmi';

export const LENS_API_URL_MAP = {
  [chain.polygon.id]: 'https://api.lens.dev',
  [chain.polygonMumbai.id]: 'https://api-mumbai.lens.dev',
};

export const LENSHUB_PROXY_ADDRESS_MAP = {
  [chain.polygon.id]: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
  [chain.polygonMumbai.id]: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
};
