import { useMemo } from 'react';

export default function Image({ src, ...props }: JSX.IntrinsicElements['img']) {
  const normalizedSrc = useMemo(() => {
    if (src?.startsWith('ipfs://')) {
      return `https://w3s.link/ipfs/${src.replace(/^ipfs:\/\//, '')}`;
    }
    return src;
  }, [src]);

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={normalizedSrc} {...props} />;
}
