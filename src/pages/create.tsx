import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Contract } from 'ethers';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  FormEventHandler,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useContract, useSigner, useWaitForTransaction } from 'wagmi';

import Layout from '@/components/layout';
import usePromiseLandContractMeta from '@/hooks/usePromiseLandContractMeta';
import { uploadFileToIPFS, uploadJSONToIPFS } from '@/utils/web3Storage';

const INITIAL_FORM_PARAMS = {
  name: '',
  description: '',
  price: '',
};

const Create: NextPage = () => {
  const router = useRouter();
  const { data: signer } = useSigner();
  const promiseLand = usePromiseLandContractMeta();

  const formRef = useRef<HTMLFormElement>();
  const [file, setFile] = useState<File | null>(null);
  const [formParams, setFormParams] = useState(INITIAL_FORM_PARAMS);
  const [txn, setTxn] = useState<TransactionResponse | null>(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const isProcessing = isUploading || Boolean(txn);

  // const priceInEth = useMemo(
  //   () => (formParams.price ? parseEther(formParams.price) : undefined),
  //   [formParams.price],
  // );

  const contract = useContract<Contract>({
    ...promiseLand,
    signerOrProvider: signer,
  });

  const { data: receipt } = useWaitForTransaction({
    hash: txn?.hash,
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const { name, description } = formParams;
      //Make sure that none of the fields are empty
      if (!name || !description || !file) return;

      setIsUploading(true);
      setMessage('Uploading image, please wait');
      uploadFileToIPFS(file)
        .then((fileURL) => {
          console.log(`Uploaded image: ${fileURL}`);
          setMessage('Uploading metadata, please wait');
          return uploadJSONToIPFS({
            name,
            description,
            image: fileURL,
          });
        })
        .then((metadataURL) => {
          console.log(`Uploaded metadata: ${metadataURL}`);
          setMessage('Creating NFT');
          return contract.createToken(metadataURL);
        })
        .then((txn: TransactionResponse) => {
          setMessage('Waiting txn confirmation');
          setTxn(txn);
        })
        .catch((e) => {
          setMessage('');
          alert(`Create error: ${e}`);
          console.log(e);
        })
        .finally(() => setIsUploading(false));
    },
    [contract, formParams, file],
  );

  useEffect(() => {
    if (!receipt) return;
    router.push(`/`);
  }, [receipt, router]);

  return (
    <Layout>
      <div className="mt-10 flex flex-col justify-center">
        <form ref={formRef as LegacyRef<HTMLFormElement>} onSubmit={onSubmit}>
          <div className="mb-8 text-lg font-bold">Create your NFT post</div>
          <div className="mb-4">
            <label>
              <div className="mb-2 block text-sm font-bold">Name</div>
              <input
                className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                required
                type="text"
                placeholder="PromiseLand"
                onChange={(e) =>
                  setFormParams((prev) => ({ ...prev, name: e.target.value }))
                }
                value={formParams.name}
                disabled={isProcessing}
              />
            </label>
          </div>
          <div className="mb-6">
            <label>
              <div className="mb-2 block text-sm font-bold">Description</div>
              <textarea
                className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                cols={40}
                rows={5}
                required
                placeholder="PromiseLand Collection"
                value={formParams.description}
                onChange={(e) =>
                  setFormParams((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                disabled={isProcessing}
              />
            </label>
          </div>
          {/* <div className="mb-6">
            <label>
              <div className="mb-2 block text-sm font-bold">Price</div>
              <input
                className="w-full appearance-none rounded-lg border py-2 px-3 leading-tight text-gray-700  focus:outline-none"
                type="number"
                required
                placeholder="Min 0.025 ETH"
                step="0.01"
                value={formParams.price}
                onChange={(e) =>
                  setFormParams((prev) => ({ ...prev, price: e.target.value }))
                }
                disabled={isProcessing}
              />
            </label>
          </div> */}
          <div>
            <label>
              <div className="mb-2 block text-sm font-bold">Upload Image</div>
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif"
                disabled={isProcessing}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>
          <div className="py-8 text-center text-green-400">{message}</div>
          <button
            type="submit"
            disabled={isProcessing}
            className="mt-5 rounded-2xl bg-blue-500 py-2 px-4 font-bold text-white shadow-lg"
          >
            {isUploading ? 'Uploading...' : txn ? 'Waiting...' : 'Create'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
