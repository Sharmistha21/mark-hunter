
import React from 'react';

interface TrademarkLogoProps {
  mark?: string;
  className?: string;
}

const TrademarkLogo: React.FC<TrademarkLogoProps> = ({ mark, className }) => {
  return (
    <div className={`bg-gray-100 border flex items-center justify-center ${className || 'w-24 h-24'}`}>
      {mark ? (
        <span className="font-bold text-lg">{mark}</span>
      ) : (
        <span className="text-gray-400">LOGO</span>
      )}
    </div>
  );
};

export default TrademarkLogo;
