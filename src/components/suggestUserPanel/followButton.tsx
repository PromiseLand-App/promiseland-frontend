import clsx from 'clsx';
import React, { useState } from 'react';

const FollowButton = () => {
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Subscribe');
  return (
    <button className={clsx('text-xs font-semibold text-blue-500')}>
      {buttonText}
    </button>
  );
};

export default FollowButton;
