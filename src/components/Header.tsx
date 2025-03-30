
import React from 'react';
import { Search, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange, onSearch }) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <a href="/" className="font-bold text-blue-800 text-2xl">Trademarkia</a>
          </div>
          
          <div className="flex-1 max-w-xl relative mx-4">
            <div className="relative flex w-full items-center">
              <Input
                type="text"
                placeholder="Search Trademarks..."
                className="pr-16 rounded-md border-gray-300"
                value={searchQuery}
                onChange={onSearchChange}
                onKeyPress={handleKeyPress}
              />
              <div className="absolute right-0 flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-1"
                  onClick={() => {/* Image search functionality */}}
                >
                  <Camera className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Apply for Trademark
            </Button>
          </div>
        </div>
        
        <nav className="flex space-x-6 mt-4">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 font-medium py-2">Trademarks</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">Owners</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">Logos</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">Internet Brand Search</a>
          <a href="#" className="text-gray-600 hover:text-gray-800 py-2">Copyrights</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
