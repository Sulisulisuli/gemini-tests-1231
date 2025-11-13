import React, { useState, useEffect } from 'react';

interface BtcPriceProps {
  heading: string;
}

export const BtcPrice = ({ heading }: BtcPriceProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.bitcoin.usd);
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '10px' }}
      >
        <path d="M12 1v22" />
        <path d="M16 7.35a4 4 0 1 0-8 0" />
        <path d="M16 16.65a4 4 0 1 1-8 0" />
      </svg>
      <div>
        <h2>{heading}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
            ${price?.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};
