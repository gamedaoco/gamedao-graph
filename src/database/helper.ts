// Imports
import { Store } from '@subsquid/substrate-processor';

// Types
import { EntityConstructor } from '../@types/entity';

// Export
export async function get<TModel>(
	store: Store,
	entityConstructor: EntityConstructor<TModel>,
	id: string,
): Promise<TModel | null> {
	return (await store.findOne<TModel>(entityConstructor, id)) ?? null;
}
