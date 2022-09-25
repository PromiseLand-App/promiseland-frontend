import { chain } from 'wagmi';

export const LENS_API_URL_MAP = {
  [chain.polygon.id]: 'https://api.lens.dev',
  [chain.polygonMumbai.id]: 'https://api-mumbai.lens.dev',
};

export const LENSHUB_PROXY_ADDRESS_MAP = {
  [chain.polygon.id]: '0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d',
  [chain.polygonMumbai.id]: '0x60Ae865ee4C725cd04353b5AAb364553f56ceF82',
};

export const PROMISELAND_ADDRESS_MAP = {
  [chain.goerli.id]: '0x18f026b9d50aeeca8029Ec3D3fBa29844691DAf1',
  [chain.optimism.id]: '0xA1d54E6119015295Fd5F662f8f74D09A7B688E7Ay',
  [chain.polygon.id]: '0xD22c813B9a2a65A5B562c22dFBF31fdd902C39fF',
  [chain.polygonMumbai.id]: '0x0dE95bed0999Dc657D7BCea5617F72AEa2015321',
};
