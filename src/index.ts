import { loadProperties, loadTenants } from './utils/DataLoader';
import { PropertyManager } from './services/PropertyManager';

async function main() {
  try {
    const properties = await loadProperties();
    const tenants = await loadTenants();
    const service = new PropertyManager(properties, tenants);
	
	// Dynamic Test Example finder
	const firstWithTenants = properties.find(p =>
		tenants.some(t => t.propertyId === p.propertyId)
	)?.propertyId;

	if (!firstWithTenants) throw new Error('No property with tenants found.');

	const firstOverdue = properties.find(p =>
		new Date(p.tenancyEndDate) < new Date()
	)?.propertyId;

	if (!firstOverdue) throw new Error('No overdue property found.');

	const firstActive = properties.find(p => {
		const t = tenants.filter(tn => tn.propertyId === p.propertyId);
		return t.length === p.capacity && new Date(p.tenancyEndDate) >= new Date();
	})?.propertyId;

	if (!firstActive) throw new Error('No active property found.');
	// 

    console.log('=== Reposit Property Analysis ===');

    // 1. Average Rent
    const avgRentLondon = service.calculateAverageRentByRegion('London');
    const avgRentWales = service.calculateAverageRentByRegion('Wales');
    console.log(`\nAverage Rent in London: £${avgRentLondon.toFixed(2)}`);
    console.log(`Average Rent in Wales: £${avgRentWales.toFixed(2)}`);

    // 2. Rent Per Tenant
    const rentPerTenant = service.calculateRentPerTenant(firstWithTenants, 'pounds');
    console.log(`\nRent per tenant for ${firstWithTenants}: £${rentPerTenant.toFixed(2)}`);

    // 3. Invalid Postcodes
    const invalidPostcodes = service.getPropertiesWithInvalidPostcodes();
    console.log(`\nProperties with invalid postcodes: [${invalidPostcodes.join(', ')}]`);

    // 4. Property Status
    const statusOverdue = service.getPropertyStatus(firstOverdue);
    const statusActive = service.getPropertyStatus(firstActive);
    console.log(`\nStatus for overdue property ${firstOverdue}: ${statusOverdue}`);
    console.log(`Status for active property ${firstActive}: ${statusActive}`);

  } catch (error) {
    console.error('\nAn error occurred:', error);
  }
}

main();