import { Web3Storage } from 'web3.storage';

// Construct with token and endpoint
export const web3Storage = new Web3Storage({
  token: process.env.NEXT_PUBLIC_WEB3_STORAGE_API_TOKEN as string,
});

export const uploadJSONToIPFS = async (json: unknown, filename?: string) => {
  const content = JSON.stringify(json);
  const file = new File([content], filename ?? 'file.json', {
    type: 'application/json',
  });
  return uploadFileToIPFS(file);
};

export const uploadFileToIPFS = async (file: File) => {
  const cid = await web3Storage.put([file]);
  return `https://w3s.link/ipfs/${cid}/${file.name}`;
};
