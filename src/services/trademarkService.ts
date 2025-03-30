
import { SearchParams, SearchResponse } from '../types/trademark';

export const searchTrademarks = async (params: SearchParams): Promise<SearchResponse> => {
  try {
    const response = await fetch('https://vit-tm-task.api.trademarkia.app/api/v3/us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    // Mock transformation - in a real app, adjust this based on actual API response
    return {
      trademarks: data.response?.docs?.map((doc: any) => ({
        mark: doc.mark_text,
        owner: doc.owner_name,
        status: doc.status,
        statusDate: doc.status_date,
        registrationNumber: doc.registration_number,
        filingDate: doc.filing_date,
        classDescription: doc.class_description,
        classNumbers: doc.classes,
        expiryDate: doc.expiry_date
      })) || [],
      totalResults: data.response?.numFound || 0
    };
  } catch (error) {
    console.error('Error fetching trademark data:', error);
    throw error;
  }
};

export const getDefaultSearchParams = (query: string = "check"): SearchParams => {
  return {
    input_query: query,
    input_query_type: "",
    sort_by: "default",
    status: [],
    exact_match: false,
    date_query: false,
    owners: [],
    attorneys: [],
    law_firms: [],
    mark_description_description: [],
    classes: [],
    page: 1,
    rows: 10,
    sort_order: "desc",
    states: [],
    counties: []
  };
};
