import { inject, injectable } from 'inversify';
import { IProjectService } from '../abstract/IProjectService';
import { IProjectDTO } from '../../dto/IProjectDTO';
import { NotFoundError } from '../../errors/CustomErrors';
import { Types, ObjectId } from 'mongoose';
import { IProject } from '../../models/Project';
import { IProjectRepository } from '../../repositorites/abstract/IProjectRepository';

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
            _id: project._id?.toHexString() || null,
            id: project._id?.toHexString() || null,
            name: project.name,
            description: project.description || null,
            startDate: project.startDate || null,
            endDate: project.endDate || null,
            status: project.status || null,
        };
    }

    private toEntity(projectDTO: Partial<IProjectDTO>): Partial<IProject> {
        const entity: Partial<IProject> = {
            name: projectDTO.name,
            description: projectDTO.description !== null ? projectDTO.description : undefined,  // Use undefined if null
            startDate: projectDTO.startDate !== null ? projectDTO.startDate : undefined,        // Use undefined if null
            endDate: projectDTO.endDate !== null ? projectDTO.endDate : undefined,              // Use undefined if null
            status: projectDTO.status !== null ? projectDTO.status : undefined,                 // Use undefined if null
        };

        if (projectDTO._id) {
            entity._id = new Types.ObjectId(projectDTO._id); // Ensure _id is an ObjectId
        }

        return entity;
    }

}
