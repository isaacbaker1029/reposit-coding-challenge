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
  
}