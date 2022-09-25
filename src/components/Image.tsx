import { ReactEventHandler, useCallback, useMemo, useState } from 'react';

export default function Image({
  src,
  fallbackSrc,
  onError,
  ...props
}: JSX.IntrinsicElements['img'] & { fallbackSrc?: string }) {
  const normalizedSrc = useMemo(() => {
    if (typeof src === 'string' && src.startsWith('ipfs://')) {
      return `https://w3s.link/ipfs/${src.replace(/^ipfs:\/\//, '')}`;
    }
    return src;
  }, [src]);

  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);

  const handleError: ReactEventHandler<HTMLImageElement> = useCallback(
    (e) => {
      setCurrentSrc(fallbackSrc);
      onError?.(e);
    },
    [onError, fallbackSrc],
  );

  // eslint-disable-next-line jsx-a11y/alt-text
  return <img src={currentSrc} onError={handleError} {...props} />;
}
