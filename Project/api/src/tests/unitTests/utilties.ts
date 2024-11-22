import { AppDataSource } from '../../ormconfig.ts';

export async function clearDatabase(): Promise<void> {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.clear();
    }
}
