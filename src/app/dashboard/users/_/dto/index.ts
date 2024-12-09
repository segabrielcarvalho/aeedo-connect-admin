export interface Organ {
  name: string;
  organType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  document: string | null;
  role: string;
  birthDate: string | null;
  organs: Organ[];
  isActive: boolean;
  createdAt: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ApiResponse {
  data: User[];
  links: Links;
  meta: Meta;
}
