import { inject, injectable } from 'inversify';
import { IProjectService } from '../abstract/IProjectService';
import { IProjectDTO } from '../../dto/IProjectDTO';
import { NotFoundError } from '../../errors/CustomErrors';
import { Types } from 'mongoose';
import { IProject } from '../../models/Project';
import {IProjectRepository} from "../../repositorites/abstract/IProjectRepository";


@injectable()
export class ProjectService implements IProjectService {
    constructor(
        @inject('IProjectRepository') private projectRepository: IProjectRepository
    ) {}

    public async createOrUpdateProject(projectDTO: Partial<IProjectDTO>): Promise<IProjectDTO> {
        if (projectDTO._id) {
            const objectId = Types.ObjectId.isValid(projectDTO._id) ? new Types.ObjectId(projectDTO._id) : projectDTO._id;
            const updatedProject = await this.projectRepository.updateById(objectId.toString(), this.toEntity(projectDTO));
            if (!updatedProject) {
                throw new NotFoundError('Project not found');
            }
            return this.toDTO(updatedProject);
        } else {
            const createdProject = await this.projectRepository.create(this.toEntity(projectDTO));
            return this.toDTO(createdProject);
        }
    }

    public async getProjectById(id: string): Promise<IProjectDTO | null> {
        const project = await this.projectRepository.findById(id);
        return project ? this.toDTO(project) : null;
    }

    public async deleteProjectById(id: string): Promise<void> {
        const project = await this.projectRepository.findById(id);
        if (!project) {
            throw new NotFoundError('Project not found');
        }
        await this.projectRepository.deleteById(id);
    }

    public async getAllProjects(): Promise<IProjectDTO[]> {
        const projects = await this.projectRepository.findAll();
        return projects.map(project => this.toDTO(project));
    }

    private toDTO(project: IProject): IProjectDTO {
        return {
            _id: project._id?.toHexString() ?? undefined, // Use nullish coalescing for safer fallback
            id: project._id?.toHexString() ?? undefined,
            name: project.name,
            description: project.description ?? undefined, // Use undefined for optional fields
            memo: project.memo ?? undefined,
            scope: project.scope ?? undefined,
            projectManager: project.projectManager ?? undefined,
            projectAssistant: project.projectAssistant ?? undefined,
            startDate: project.startDate ?? undefined,
            finishDate: project.finishDate ?? undefined, // Assuming you meant to use endDate instead of finishDate in the DTO
            status: project.status ?? undefined,
        };
    }

    private toEntity(projectDTO: Partial<IProjectDTO>): Partial<IProject> {
        const entity: Partial<IProject> = {
            name: projectDTO.name,
            description: projectDTO.description ?? undefined,
            memo: projectDTO.memo ?? undefined,
            scope: projectDTO.scope ?? undefined,
            projectManager: projectDTO.projectManager ?? undefined,
            projectAssistant: projectDTO.projectAssistant ?? undefined,
            startDate: projectDTO.startDate ?? undefined,
            finishDate: projectDTO.finishDate ?? undefined,
            status: projectDTO.status ?? undefined,
        };

        if (projectDTO._id) {
            entity._id = new Types.ObjectId(projectDTO._id);
        }

        return entity;
    }
}
