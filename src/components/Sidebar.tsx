
import React, { useState } from 'react';
import { Check, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SidebarProps {
  onCheckRegistrability: () => void;
  onFilterChange?: (filters: { status: string[]; owners: string[] }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCheckRegistrability, onFilterChange }) => {
  const [nameQuery, setNameQuery] = useState('');
  const [description, setDescription] = useState('');
  const [trademarkName, setTrademarkName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [ownerSearchQuery, setOwnerSearchQuery] = useState('');
  
  const statusOptions = ['Registered', 'Pending', 'Abandoned', 'Cancelled', 'Expired'];
  const ownerOptions = [
    'Tesla, Inc.', 
    'LEGALFORCE RAPC.', 
    'SpaceX Inc.', 
    'SpooqX Inc.', 
    'Nike, Inc.', 
    'Apple Inc.', 
    'Microsoft Corporation'
  ];

  // Filter owners based on search query
  const filteredOwners = ownerSearchQuery 
    ? ownerOptions.filter(owner => 
        owner.toLowerCase().includes(ownerSearchQuery.toLowerCase()))
    : ownerOptions;

  const handleStatusChange = (status: string) => {
    setSelectedStatuses(prev => {
      const newStatuses = prev.includes(status) 
        ? prev.filter(s => s !== status) 
        : [...prev, status];
      
      if (onFilterChange) {
        onFilterChange({ status: newStatuses, owners: selectedOwners });
      }
      
      return newStatuses;
    });
  };

  const handleOwnerChange = (owner: string) => {
    setSelectedOwners(prev => {
      const newOwners = prev.includes(owner) 
        ? prev.filter(o => o !== owner) 
        : [...prev, owner];
      
      if (onFilterChange) {
        onFilterChange({ status: selectedStatuses, owners: newOwners });
      }
      
      return newOwners;
    });
  };

  return (
    <div className="w-full md:w-80 px-4 py-4 space-y-8">
      {/* Filter Section - Now placed at the top */}
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Status</h3>
          <Filter className="h-4 w-4 text-gray-500" />
        </div>
        
        <div className="space-y-2">
          {statusOptions.map((status) => (
            <div key={status} className="flex items-center space-x-2">
              <Checkbox 
                id={`status-${status}`} 
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusChange(status)}
              />
              <label
                htmlFor={`status-${status}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {status}
              </label>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h3 className="font-bold text-gray-800 mb-2">Owners</h3>
          <div className="relative mb-2">
            <Input
              type="text"
              placeholder="Search Owners"
              className="pr-8"
              value={ownerSearchQuery}
              onChange={(e) => setOwnerSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filteredOwners.map((owner) => (
              <div key={owner} className="flex items-center space-x-2">
                <Checkbox 
                  id={`owner-${owner}`} 
                  checked={selectedOwners.includes(owner)}
                  onCheckedChange={() => handleOwnerChange(owner)}
                />
                <label
                  htmlFor={`owner-${owner}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {owner}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div>
          <h3 className="font-bold text-gray-800 mb-2">Display</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Grid View
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              List View
            </Button>
          </div>
        </div>
      </div>
      
      {/* AI Trademark Registrability - Now moved below the filters */}
      <div className="border rounded-lg p-4 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 mr-2 text-purple-500">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="font-bold text-gray-800">AI Trademark Registrability</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <Input
              type="text"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              placeholder="nike"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the products and services related to the name"
              className="min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={onCheckRegistrability} 
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            <Check className="mr-2 h-4 w-4" />
            Check Registrability
          </Button>
        </div>
      </div>
      
      {/* Apply for Trademark - Kept in the same position */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Apply for Trademark</h3>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select countries to protect your logo trademark
          </p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trademark Name</label>
            <Input
              type="text"
              value={trademarkName}
              onChange={(e) => setTrademarkName(e.target.value)}
              placeholder="nike"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Country Selected</label>
            <div className="border rounded p-2 text-sm">{selectedCountry}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
