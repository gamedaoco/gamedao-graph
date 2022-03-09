// Imports
import {Store} from "@subsquid/substrate-processor";

// Types
import {EntityConstructor} from "../@types/entity";

// Export
export async function get<TModel>(store: Store, entityConstructor: EntityConstructor<TModel>, id: string, createIfNotExist: boolean): Promise<TModel | null> {
    return (await store.get<TModel>(entityConstructor, {where: {id}})) ?? (createIfNotExist
            ? new entityConstructor({id})
            : null
    );
}
