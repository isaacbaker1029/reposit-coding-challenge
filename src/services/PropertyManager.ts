import { Property, Tenant, Currency, PropertyStatus } from '../types';

export class PropertyManager {
  constructor(private properties: Property[], private tenants: Tenant[]) {}
  
    /**
   * REQUIREMENT 1: Calculate average rent by region.
   */
  public calculateAverageRentByRegion(region: string): number {
    const regionalProperties = this.properties.filter((p) => p.region.toLowerCase() === region.toLowerCase());
    if (regionalProperties.length === 0) return 0;
    const totalRent = regionalProperties.reduce((sum, p) => sum + p.monthlyRent, 0);
    return totalRent / regionalProperties.length;
  }
  
    /**
   * REQUIREMENT 2: Calculate rent per tenant for a property.
   */
  public calculateRentPerTenant(propertyId: string, currency: Currency = 'pounds'): number {
    const property = this.properties.find((p) => p.propertyId === propertyId);
    if (!property) throw new Error(`Property with ID "${propertyId}" not found.`);
    const propertyTenants = this.tenants.filter((t) => t.propertyId === propertyId);
    if (propertyTenants.length === 0) throw new Error(`Property with ID "${propertyId}" has no tenants.`);
    const rentPerTenantInPounds = property.monthlyRent / propertyTenants.length;
    return currency === 'pence' ? rentPerTenantInPounds * 100 : rentPerTenantInPounds;
  }
  
}