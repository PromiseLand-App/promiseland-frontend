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
  [chain.optimism.id]: '0x07F27B3FCF01126dc47E654b6a5BfC1D30D52B11',
  [chain.polygon.id]: '0x20783895a1edd9db92E7bC57D38C0895AFBe7a9c',
  [chain.polygonMumbai.id]: '0x0dE95bed0999Dc657D7BCea5617F72AEa2015321',
};
