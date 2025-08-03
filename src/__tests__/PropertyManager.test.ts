import { PropertyManager } from '../services/PropertyManager';
import { Property, Tenant } from '../types';

// Mock Data for fast and reliable tests
const mockProperties: Property[] = [
	{ propertyId: 'P1', address: '1 Dev Street', postcode: 'SW1A 0AA', region: 'London', monthlyRent: 2000, capacity: 2, tenancyEndDate: new Date('2026-12-31') }, // Active Property
	{ propertyId: 'P2', address: '2 Code Lane', postcode: 'M1 1AE', region: 'Manchester', monthlyRent: 1200, capacity: 3, tenancyEndDate: new Date('2026-12-31') }, // Partially Vacant
	{ propertyId: 'P3', address: '3 SQL Square', postcode: 'INVALID', region: 'London', monthlyRent: 2500, capacity: 2, tenancyEndDate: new Date('2026-12-31') }, // Invalid Postcode
	{ propertyId: 'P4', address: '4 Bug Bash', postcode: 'G1 1AA', region: 'Glasgow', monthlyRent: 1000, capacity: 1, tenancyEndDate: new Date('2023-01-01') }, // Overdue property
	{ propertyId: 'P5', address: '5 Empty Road', postcode: 'E1 6AN', region: 'London', monthlyRent: 1500, capacity: 2, tenancyEndDate: new Date('2026-12-31')}, // Vacant property
	{ propertyId: 'P6', address: '6 Full Street', postcode: 'W1A 1AA', region: 'London', monthlyRent: 1800, capacity: 2, tenancyEndDate: new Date('2026-12-31') } // Active Property
];

const mockTenants: Tenant[] = [
	{ tenantId: 'T1', name: 'John Doe', propertyId: 'P1' },
	{ tenantId: 'T2', name: 'Jane Smith', propertyId: 'P1' }, // P1 is at capacity
	{ tenantId: 'T3', name: 'Peter Jones', propertyId: 'P2' }, // P2 is partially vacant
	{ tenantId: 'T4', name: 'Sue Storm', propertyId: 'P4' }, // Tenant in an overdue property
	{ tenantId: 'T5', name: 'Tony Stark', propertyId: 'P6' },
	{ tenantId: 'T6', name: 'Steve Rogers', propertyId: 'P6' }  
];

describe('PropertyManager', () => {
	let service: PropertyManager;
	beforeEach(() => {
		service = new PropertyManager(mockProperties, mockTenants);
	});

	describe('calculateAverageRentByRegion', () => {
		it('should calculate the correct average rent for a region', () => {
			expect(service.calculateAverageRentByRegion('London')).toBe(1950); // (2000 + 2500 + 1500 + 1800) / 4 = 1950
		});

		it('should return 0 for a region with no properties', () => {
			expect(service.calculateAverageRentByRegion('Bristol')).toBe(0);
		});

		it('should handle case insensitivity in region names', () => {
			expect(service.calculateAverageRentByRegion('london')).toBe(1950);
		});
	});

	describe('calculateRentPerTenant', () => {
		it('should calculate rent per tenant in pounds by default', () => {
			expect(service.calculateRentPerTenant('P1')).toBe(1000);
		});

		it('should calculate rent per tenant in pence when specified', () => {
			expect(service.calculateRentPerTenant('P1', 'pence')).toBe(100000);
		});

		it('should throw an error if property has no tenants', () => {
			expect(() => service.calculateRentPerTenant('P5')).toThrow('Property with ID "P5" has no tenants.');
		});

		it('should throw an error if property does not exist', () => {
			expect(() => service.calculateRentPerTenant('P999')).toThrow('Property with ID "P999" not found.');
		});
	});
	
	describe('getPropertiesWithInvalidPostcodes', () => {
		it('should return a list of property IDs with invalid postcodes', () => {
			expect(service.getPropertiesWithInvalidPostcodes()).toEqual(['P3']);
		});
	});

});