import Layout from '@/components/layout';
import NftPanel from '@/components/nftPanel';
import { queryParamNumberParser, useQueryParam } from '@/hooks/useQueryParam';

export default function Post() {
  const tokenId = useQueryParam('tokenId', queryParamNumberParser);

  return <Layout>{tokenId != null && <NftPanel tokenId={tokenId} />}</Layout>;
}
