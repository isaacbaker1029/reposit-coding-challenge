import { loadProperties, loadTenants } from './utils/DataLoader';

async function main() {
  console.log('Attempting to load data...');
  try {
    const properties = await loadProperties();
    const tenants = await loadTenants();

	console.log(`Loaded ${properties.length} properties.`);
    console.log(`Loaded ${tenants.length} tenants`);
    
    console.log('\n--- Sample Property ---');
    console.log(properties[0]);
    
    console.log('\n--- Sample Tenant ---');
    console.log(tenants[0]);

  } catch (error) {
    console.error('Failed to load or process data:', error);
  }
}

main();