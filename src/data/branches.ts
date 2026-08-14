export interface Branch {
  id: string;
  city: string;
  state: string;
  country: string;
  /** Street address. Empty until a verified address is supplied. */
  address: string;
  phone: string;
  email: string;
  /** Path under `public/branches/`. */
  image?: string;
  mapUrl?: string;
  isHeadquarters?: boolean;
}

/**
 * Locations. The company profile identifies Erode, Tamil Nadu — nothing else is
 * listed here until real branch details are supplied. Fields left as empty
 * strings are hidden by the UI rather than rendered blank.
 */
export const branches: Branch[] = [
  {
    id: 'erode',
    city: 'Erode',
    state: 'Tamil Nadu',
    country: 'India',
    address: '',
    phone: '',
    email: '',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Erode%2C%20Tamil%20Nadu',
    isHeadquarters: true,
  },
];

export const headquarters = branches.find((branch) => branch.isHeadquarters) ?? branches[0];
