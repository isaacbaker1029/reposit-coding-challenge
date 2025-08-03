export interface Property {
  propertyId: string;
  address: string;
  postcode: string;
  region: string;
  monthlyRent: number; // Stored in pounds for easier calculation
  capacity: number;
  tenancyEndDate: Date;
}

export interface Tenant {
  tenantId: string;
  name: string;
  propertyId: string;
}

export type Currency = 'pounds' | 'pence';
export type PropertyStatus = 'PROPERTY_VACANT' | 'PARTIALLY_VACANT' | 'PROPERTY_ACTIVE' | 'PROPERTY_OVERDUE';