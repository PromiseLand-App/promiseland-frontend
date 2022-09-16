export const IS_MAINNET = process.env.NEXT_PUBLIC_IS_MAINNET === 'true';

export const API_URL = IS_MAINNET
  ? 'https://api.lens.dev'
  : 'https://api-mumbai.lens.dev';
