import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { Property, Tenant } from '../types';

// The only change is adding 'src' to the path here
const DATA_FOLDER_PATH = path.join(process.cwd(), 'src', 'data');

async function loadCSV<T>(filePath: string, mapValues: (data: Record<string, string>) => T): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row: Record<string, string>) => results.push(mapValues(row)))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  });
}

export async function loadProperties(filename: string = 'properties.csv'): Promise<Property[]> {
  const filePath = path.join(DATA_FOLDER_PATH, filename);
  return loadCSV<Property>(filePath, (row) => ({
    propertyId: row.id,
    address: row.address,
    postcode: row.postcode,
    region: row.region,
    monthlyRent: parseFloat(row.monthlyRentPence) / 100,
    capacity: parseInt(row.capacity, 10),
    tenancyEndDate: new Date(row.tenancyEndDate),
  }));
}

export async function loadTenants(filename: string = 'tenants.csv'): Promise<Tenant[]> {
  const filePath = path.join(DATA_FOLDER_PATH, filename);
  return loadCSV<Tenant>(filePath, (row) => ({
    tenantId: row.id,
    name: row.name,
    propertyId: row.propertyId,
  }));
}