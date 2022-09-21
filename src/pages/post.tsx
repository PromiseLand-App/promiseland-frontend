import type { NextPage } from 'next';
import { useState } from 'react';

import Layout from '@/components/layout';
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/utils/pinata';

import PromiseLand from '../abi/PromiseLand.json';

const Post: NextPage = () => {
  const [formParams, updateFormParams] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [fileURL, setFileURL] = useState(null);
  const ethers = require('ethers');
  const [message, updateMessage] = useState('');

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log('Uploaded image to Pinata: ', response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log('Error during file upload', e);
    }
  }

  //This function uploads the metadata to IPDS
  async function uploadMetadataToIPFS() {
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
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log('Uploaded JSON to Pinata: ', response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log('error uploading JSON metadata:', e);
    }
  }

  async function listNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      updateMessage('Please wait.. uploading (upto 5 mins)');

      //Pull the deployed contract instance
      const contract = new ethers.Contract(
        PromiseLand.address,
        PromiseLand.abi,
        signer,
      );

      //massage the params to be sent to the create NFT request
      const price = ethers.utils.parseUnits(formParams.price, 'ether');
      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();

      //actually create the NFT
      let transaction = await contract.createToken(metadataURL, price, {
        value: listingPrice,
      });
      await transaction.wait();

      alert('Successfully listed your NFT!');
      updateMessage('');
      updateFormParams({ name: '', description: '', price: '' });
    } catch (e) {
      alert('Upload error' + e);
    }
  }
  return (
    <Layout>
      <div className="mt-10 flex flex-col justify-center" id="nftForm">
        <div className="mb-8 text-lg font-bold">Create your NFT post</div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="name"
            type="text"
            placeholder="PromiseLand"
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
            value={formParams.name}
          ></input>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="description">
            Description
          </label>
          <textarea
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            cols="40"
            rows="5"
            id="description"
            type="text"
            placeholder="PromiseLand Collection"
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block  text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            placeholder="Min 0.025 ETH"
            step="0.01"
            value={formParams.price}
            onChange={(e) =>
              updateFormParams({ ...formParams, price: e.target.value })
            }
          ></input>
        </div>
        <div>
          <label className="block  text-sm font-bold mb-2" htmlFor="image">
            Upload Image
          </label>
          <input type={'file'} onChange={OnChangeFile}></input>
        </div>
        <br></br>
        <div className="text-green text-center">{message}</div>
        <button
          onClick={listNFT}
          className="mt-10 w-20 rounded-2xl bg-blue-500 p-2 font-bold text-white shadow-lg"
        >
          Create
        </button>
      </div>
    </Layout>
  );
};

export default Post;
