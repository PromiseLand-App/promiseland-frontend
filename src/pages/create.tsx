import { parseEther } from 'ethers/lib/utils';
import type { NextPage } from 'next';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';

import PromiseLand from '@/abis/PromiseLand.json';
import Layout from '@/components/layout';
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/utils/web3Storage';

const Create: NextPage = () => {
  const [formParams, updateFormParams] = useState({
    name: '',
    description: '',
    price: '',
  });

  const priceInEth = useMemo(
    () => (formParams.price ? parseEther(formParams.price) : undefined),
    [formParams.price],
  );
  const { data: listingPrice } = useContractRead({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
    functionName: 'getListingPrice',
  });

  const [fileURL, setFileURL] = useState('');
  const [metadataURL, setMetadataURL] = useState('');
  const [message, updateMessage] = useState('');
  const { config } = usePrepareContractWrite({
    addressOrName: PromiseLand.address,
    contractInterface: PromiseLand.abi,
    functionName: 'createToken',
    args: [metadataURL, priceInEth],
    overrides: { value: listingPrice },
    enabled: Boolean(metadataURL && priceInEth && listingPrice),
  });
  const { data, write, error } = useContractWrite(config);
  const { data: receipt } = useWaitForTransaction({
    hash: data?.hash,
  });

  //This function uploads the NFT image to IPFS
  const onChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      //check for file extension
      try {
        //upload the file to IPFS
        const url = await uploadFileToIPFS(file);
        console.log('Uploaded image to IPFS: ', url);
        setFileURL(url);
      } catch (e) {
        console.log('Error during file upload', e);
      }
    },
    [],
  );

  //This function uploads the metadata to IPDS
  const uploadMetadataToIPFS = useCallback(async () => {
    const { name, description, price } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !price || !fileURL) return;

    const nftJSON = {
      name,
      description,
      price,
      image: fileURL,
    };

    try {
      //upload the metadata JSON to IPFS
      const url = await uploadJSONToIPFS(nftJSON);
      console.log('Uploaded JSON to IPFS: ', url);
      setMetadataURL(url);
    } catch (e) {
      console.log('error uploading JSON metadata:', e);
    }
  }, [fileURL, formParams]);

  const createNFT: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      e.preventDefault();

      //Upload data to IPFS
      try {
        await uploadMetadataToIPFS();
        updateMessage('Please wait.. uploading (upto 5 mins)');
      } catch (e) {
        alert('Upload error' + e);
      }
    },
    [uploadMetadataToIPFS],
  );

  useEffect(() => {
    write?.();
  }, [write]);

  useEffect(() => {
    if (!receipt) return;
    alert('Successfully listed your NFT!');
    updateMessage('');
    updateFormParams({ name: '', description: '', price: '' });
  }, [receipt]);

  useEffect(() => {
    if (error) {
      alert(`Upload error ${error}`);
    }
  }, [error]);

  return (
    <Layout>
      <div className="mt-10 flex flex-col justify-center" id="nftForm">
        <div className="mb-8 text-lg font-bold">Create your NFT post</div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
            id="name"
            type="text"
            placeholder="PromiseLand"
            onChange={(e) =>
              updateFormParams((prev) => ({ ...prev, name: e.target.value }))
            }
            value={formParams.name}
          ></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
            cols={40}
            rows={5}
            id="description"
            placeholder="PromiseLand Collection"
            value={formParams.description}
            onChange={(e) =>
              updateFormParams((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="mb-2  block text-sm font-bold" htmlFor="price">
            Price
          </label>
          <input
            className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700  focus:outline-none"
            type="number"
            placeholder="Min 0.025 ETH"
            step="0.01"
            value={formParams.price}
            onChange={(e) =>
              updateFormParams((prev) => ({ ...prev, price: e.target.value }))
            }
          ></input>
        </div>
        <div>
          <label className="mb-2  block text-sm font-bold" htmlFor="image">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={onChangeFile}
          ></input>
        </div>
        <br></br>
        <div className="text-center text-green-400">{message}</div>
        <button
          onClick={createNFT}
          className="mt-5 w-20 rounded-2xl bg-blue-500 p-2 font-bold text-white shadow-lg"
        >
          Create
        </button>
      </div>
    </Layout>
  );
};

export default Create;
