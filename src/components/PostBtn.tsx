import { IEssenceMetadata } from '@/schemas/essence';

/* Construct the metadata object for the Essence NFT */
const metadata: IEssenceMetadata = {
  metadata_id: uuidv4(),
  version: '1.0.0',
  app_id: 'cyberconnect',
  lang: 'en',
  issue_date: new Date().toISOString(),
  content: post,
  media: [],
  tags: [],
  image: nftImageURL ? nftImageURL : '',
  image_data: !nftImageURL ? svg_data : '',
  name: `@${handle}'s post`,
  description: `@${handle}'s post on CyberConnect Content app`,
  animation_url: '',
  external_url: '',
  attributes: [],
};

/* Upload metadata to IPFS */
const ipfsHash = await pinJSONToIPFS(metadata);

/* Create typed data in a readable format */
const typedDataResult = await createRegisterEssenceTypedData({
  variables: {
    input: {
      /* The profile id under which the Essence is registered */
      profileID: profileID,
      /* Name of the Essence */
      name: 'Post',
      /* Symbol of the Essence */
      symbol: 'POST',
      /* URL for the json object containing data about content and the Essence NFT */
      tokenURI: `https://cyberconnect.mypinata.cloud/ipfs/${ipfsHash}`,
      /* Middleware that allows users to collect the Essence NFT for free */
      middleware: {
        collectFree: true,
      },
      /* Set if the Essence should be transferable or not */
      transferable: true,
    },
  },
});

const typedData =
  typedDataResult.data?.createRegisterEssenceTypedData?.typedData;
const message = typedData.data;
const typedDataID = typedData.id;

/* Get the signature for the message signed with the wallet */
const fromAddress = await signer.getAddress();
const params = [fromAddress, message];
const method = 'eth_signTypedData_v4';
const signature = await signer.provider.send(method, params);

/* Call the relay to broadcast the transaction */
const relayResult = await relay({
  variables: {
    input: {
      typedDataID: typedDataID,
      signature: signature,
    },
  },
});
const txHash = relayResult.data?.relay?.relayTransaction?.txHash;
