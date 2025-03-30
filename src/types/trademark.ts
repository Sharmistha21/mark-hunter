
export interface TrademarkResult {
  mark: string;
  owner: string;
  status: string;
  statusDate?: string;
  registrationNumber: string;
  filingDate: string;
  classDescription: string;
  classNumbers: string[];
  expiryDate?: string;
}

export interface SearchResponse {
  trademarks: TrademarkResult[];
  totalResults: number;
}

export interface SearchParams {
  input_query: string;
  input_query_type: string;
  sort_by: string;
  status: string[];
  exact_match: boolean;
  date_query: boolean;
  owners: string[];
  attorneys: string[];
  law_firms: string[];
  mark_description_description: string[];
  classes: string[];
  page: number;
  rows: number;
  sort_order: string;
  states: string[];
  counties: string[];
}
