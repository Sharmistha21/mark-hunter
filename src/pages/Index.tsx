
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import Header from '@/components/Header';
import SearchResults from '@/components/SearchResults';
import Sidebar from '@/components/Sidebar';
import { SearchParams, TrademarkResult } from '@/types/trademark';
import { searchTrademarks, getDefaultSearchParams } from '@/services/trademarkService';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('check');
  const [searchParams, setSearchParams] = useState<SearchParams>(getDefaultSearchParams(searchQuery));
  const { toast: uiToast } = useToast();

  // Function to handle search
  const handleSearch = () => {
    setSearchParams((prev) => ({
      ...prev,
      input_query: searchQuery,
      page: 1
    }));
  };

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle checking registrability
  const handleCheckRegistrability = () => {
    toast('Checking registrability', {
      description: 'Analyzing trademark registrability for your query...',
      duration: 3000,
    });
  };
  
  // Handle filter changes
  const handleFilterChange = (filters: { status: string[]; owners: string[] }) => {
    setSearchParams((prev) => ({
      ...prev,
      status: filters.status,
      owners: filters.owners,
      page: 1
    }));
  };
  
  // Query to fetch trademark data
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['trademarks', searchParams],
    queryFn: () => searchTrademarks(searchParams),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Handle error
  useEffect(() => {
    if (isError && error) {
      uiToast({
        title: 'Error',
        description: 'Failed to fetch trademark data. Please try again.',
        variant: 'destructive',
      });
      console.error('Search error:', error);
    }
  }, [isError, error, uiToast]);

  // Mock data for initial render if needed
  const mockResults: TrademarkResult[] = [
    {
      mark: 'NIKE',
      owner: 'Nike, Inc.',
      status: 'Live/Registered',
      statusDate: 'on 24 Oct 2023',
      registrationNumber: '73302505',
      filingDate: '23 Mar 1981',
      classDescription: 'Retail Footwear and Apparel Store Services',
      classNumbers: ['042'],
      expiryDate: '21 Jun 2033'
    },
    {
      mark: 'NIKE',
      owner: 'Nike, Inc.',
      status: 'Live/Registered',
      statusDate: 'on 29 Sep 2023',
      registrationNumber: '73361064',
      filingDate: '22 Apr 1982',
      classDescription: 'ATHLETIC AND CASUAL CLOTHING FOR MEN, WOMEN AND CHILDREN-NAMELY SHIRT',
      classNumbers: ['025'],
      expiryDate: '10 May 2033'
    },
    {
      mark: 'NIKE',
      owner: 'Nike, Inc.',
      status: 'Live/Registered',
      statusDate: 'on 14 Mar 2023',
      registrationNumber: '87295796',
      filingDate: '10 Jan 2017',
      classDescription: 'Entertainment services in the nature of organizing sporting events',
      classNumbers: ['041'],
      expiryDate: '30 Aug 2027'
    }
  ];

  // Prepare results for display - use real data if available, otherwise use mock data
  const results = data?.trademarks || mockResults;
  const totalResults = data?.totalResults || 160;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchInputChange} 
        onSearch={handleSearch} 
      />
      
      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1 order-2 md:order-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-4 border-b">
                <div className="text-sm text-gray-500">
                  {totalResults > 0 ? `${totalResults} results found` : 'No results found'}
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center text-gray-700 text-sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filters
                  </button>
                  <div className="flex gap-4">
                    <button className="text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <line x1="7" x2="17" y1="8" y2="8"></line>
                        <line x1="7" x2="17" y1="12" y2="12"></line>
                        <line x1="7" x2="17" y1="16" y2="16"></line>
                      </svg>
                    </button>
                    <button className="text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                        <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                        <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                        <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                        <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <SearchResults 
                results={results} 
                totalResults={totalResults}
                searchQuery={searchQuery}
              />
            </>
          )}
        </div>
        
        <div className="md:w-80 order-1 md:order-2 border-l">
          <Sidebar 
            onCheckRegistrability={handleCheckRegistrability} 
            onFilterChange={handleFilterChange}
          />
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-gray-600 text-sm">
        <p>© 2023 Trademarkia. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
