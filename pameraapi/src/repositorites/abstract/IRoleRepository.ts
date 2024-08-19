import { IRole } from '../../models/Role';
import { IBaseRepository } from './common/IBaseRepository';

export interface IRoleRepository extends IBaseRepository<IRole> {
    findByName(name: string): Promise<IRole | null>;
}
