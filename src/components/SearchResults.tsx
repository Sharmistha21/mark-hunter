
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TrademarkResult } from '../types/trademark';

interface SearchResultsProps {
  results: TrademarkResult[];
  totalResults: number;
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  totalResults, 
  searchQuery 
}) => {
  if (!results.length) {
    return <div className="text-center py-8">No results found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-4">
        <h2 className="text-gray-700 text-md">
          About {totalResults} Trademarks found for "{searchQuery}"
        </h2>
      </div>

      <div className="mb-4">
        <span className="text-gray-700 mr-2">Also try searching for:</span>
        {searchQuery && (
          <span className="inline-block mr-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm border border-orange-200">
            "{searchQuery}"
          </span>
        )}
        {searchQuery && (
          <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm border border-orange-200">
            "{searchQuery.toLowerCase()}"
          </span>
        )}
      </div>

      <div className="grid grid-cols-12 text-sm font-medium text-gray-600 pb-2 border-b">
        <div className="col-span-1">Mark</div>
        <div className="col-span-3">Details</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-6">Class/Description</div>
      </div>

      <div>
        {results.map((result, index) => (
          <div 
            key={index} 
            className="grid grid-cols-12 py-4 border-b hover:bg-gray-50 cursor-pointer"
          >
            <div className="col-span-1 flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-100 flex items-center justify-center border">
                <div className="text-xl font-bold text-gray-400">LOGO</div>
              </div>
            </div>
            
            <div className="col-span-3">
              <h3 className="font-bold text-gray-800 mb-1">{result.mark}</h3>
              <p className="text-gray-600 text-sm mb-3">{result.owner}</p>
              <p className="text-gray-800 text-sm mb-1">{result.registrationNumber}</p>
              <p className="text-gray-600 text-xs">{result.filingDate}</p>
            </div>
            
            <div className="col-span-2">
              <div className="flex items-center">
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-green-600 text-sm">Live/Registered</span>
                </span>
              </div>
              <p className="text-gray-600 text-xs mt-1">{result.statusDate}</p>
              
              {result.expiryDate && (
                <div className="mt-2">
                  <span className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                    <span className="text-gray-600 text-xs">{result.expiryDate}</span>
                  </span>
                </div>
              )}
            </div>
            
            <div className="col-span-5">
              <p className="text-gray-800 text-sm mb-2">{result.classDescription}</p>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {result.classNumbers.map((classNum, i) => (
                  <div key={i} className="flex items-center text-xs bg-gray-100 rounded px-2 py-1">
                    <span>Class {classNum}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-span-1 flex items-center justify-end">
              <ChevronRight className="text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
