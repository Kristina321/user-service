import { AppDataSource } from './data-source';

export async function getDataSource() {
  return AppDataSource.initialize();
}
