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
  [chain.goerli.id]: '0x6c5Db738D47f6A4004f6CA4db3CBc793339F303E',
  [chain.optimism.id]: '0xf15f68FaAf12d01Be9A55a30b0bfEE646B9b90e0',
  [chain.polygon.id]: '0xacD19aD32B617a18727BC90A42fB1f9c9973B4DE',
  [chain.polygonMumbai.id]: '0x0dE95bed0999Dc657D7BCea5617F72AEa2015321',
};
