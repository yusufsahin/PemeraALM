import { inject, injectable } from 'inversify';
import { IWorkitemService } from '../abstract/IWorkitemService';
import { IWorkitemDTO } from '../../dto/IWorkitemDTO';
import { IWorkitem } from '../../models/Workitem';
import { Types } from 'mongoose';
import {WorkitemRepository} from "../../repositorites/concrete/WorkitemRepository";
import {UserRepository} from "../../repositorites/concrete/UserRepository";

@injectable()
export class WorkitemService implements IWorkitemService {
    constructor(
        @inject('IWorkitemRepository') private workitemRepository: WorkitemRepository,
        @inject('IUserRepository') private userRepository: UserRepository
    ) {}

    async createWorkitem(workitemDTO: IWorkitemDTO): Promise<IWorkitemDTO> {
        const responsibleUser = workitemDTO.responsibleUserId
            ? await this.userRepository.findById(workitemDTO.responsibleUserId)
            : null;

        const workitemData: Partial<IWorkitem> = {
            name: workitemDTO.name,
            description: workitemDTO.description,
            point: workitemDTO.point,
            dueDate: workitemDTO.dueDate,
            expectedDate: workitemDTO.expectedDate,
            actualDate: workitemDTO.actualDate,
            responsibleUser: responsibleUser?._id || null,
            type: workitemDTO.type as any,
            state: workitemDTO.state as any,
            category: workitemDTO.category as any,
            project: workitemDTO.projectId as any,
            memo: workitemDTO.memo ? JSON.stringify(workitemDTO.memo) : undefined,
            scope: workitemDTO.scope ? JSON.stringify(workitemDTO.scope) : undefined,
        };

        const workitem = await this.workitemRepository.create(workitemData);
        return this.toDTO(workitem);
    }

    async updateWorkitem(workitemId: string, workitemDTO: IWorkitemDTO): Promise<IWorkitemDTO | null> {
        const workitem = await this.workitemRepository.findById(workitemId);
        if (!workitem) throw new Error('Workitem not found');

        if (workitemDTO.responsibleUserId !== undefined) {
            const responsibleUser = workitemDTO.responsibleUserId
                ? await this.userRepository.findById(workitemDTO.responsibleUserId)
                : null;
            workitem.responsibleUser = responsibleUser?._id || null;
        }

        if (workitemDTO.memo !== undefined) {
            workitem.memo = workitemDTO.memo ? JSON.stringify(workitemDTO.memo) : undefined;
        }

        if (workitemDTO.scope !== undefined) {
            workitem.scope = workitemDTO.scope ? JSON.stringify(workitemDTO.scope) : undefined;
        }

        Object.assign(workitem, workitemDTO);
        const updatedWorkitem = await this.workitemRepository.updateById(workitemId, workitem);
        return updatedWorkitem ? this.toDTO(updatedWorkitem) : null;
    }

    async getWorkitemById(workitemId: string): Promise<IWorkitemDTO | null> {
        const workitem = await this.workitemRepository.findById(workitemId, ['responsibleUser', 'project']);
        if (!workitem) return null;

        const responsibleUser = workitem.responsibleUser
            ? await this.userRepository.findById((workitem.responsibleUser as Types.ObjectId).toHexString())
            : null;

        return this.toDTO({
            ...workitem.toObject(),
            responsibleUser: responsibleUser?._id || null,
        } as IWorkitem);
    }

    async listAllWorkitems(): Promise<IWorkitemDTO[]> {
        const workitems = await this.workitemRepository.findAll({}, ['responsibleUser', 'project']);
        return Promise.all(workitems.map(async (workitem) => {
            const responsibleUser = workitem.responsibleUser
                ? await this.userRepository.findById((workitem.responsibleUser as Types.ObjectId).toHexString())
                : null;

            return this.toDTO({
                ...workitem.toObject(),
                responsibleUser: responsibleUser?._id || null,
            } as IWorkitem);
        }));
    }

    async deleteWorkitem(workitemId: string): Promise<void> {
        await this.workitemRepository.deleteById(workitemId);
    }

    async findAllByProjectId(projectId: string): Promise<IWorkitemDTO[]> {
        const workitems = await this.workitemRepository.findAllByProjectId(projectId, ['responsibleUser', 'project']);
        return Promise.all(workitems.map(async (workitem) => {
            const responsibleUser = workitem.responsibleUser
                ? await this.userRepository.findById((workitem.responsibleUser as Types.ObjectId).toHexString())
                : null;

            return this.toDTO({
                ...workitem.toObject(),
                responsibleUser: responsibleUser?._id || null,
            } as IWorkitem);
        }));
    }

    // Convert IWorkitem to IWorkitemDTO
    private toDTO(workitem: IWorkitem): IWorkitemDTO {
        return {
            id: workitem._id.toHexString(),
            name: workitem.name,
            description: workitem.description,
            point: workitem.point,
            dueDate: workitem.dueDate,
            expectedDate: workitem.expectedDate,
            actualDate: workitem.actualDate,
            responsibleUserId: workitem.responsibleUser ? (workitem.responsibleUser as Types.ObjectId).toHexString() : null,
            type: workitem.type,
            state: workitem.state,
            category: workitem.category,
            projectId: workitem.project ? (workitem.project as Types.ObjectId).toHexString() : null,
            memo: workitem.memo ? JSON.parse(workitem.memo) : undefined,
            scope: workitem.scope ? JSON.parse(workitem.scope) : undefined,
        };
    }
}
