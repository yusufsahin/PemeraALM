import { inject, injectable } from 'inversify';
import { IProjectService } from '../abstract/IProjectService';
import { IProjectRepository } from '../../repositorites/abstract/IProjectRepository';
import { IUserRepository } from '../../repositorites/abstract/IUserRepository';
import { IProjectDTO } from '../../dto/IProjectDTO';
import { IProject } from '../../models/Project';
import { Types } from 'mongoose';

@injectable()
export class ProjectService implements IProjectService {
    constructor(
        @inject('IProjectRepository') private projectRepository: IProjectRepository,
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    async createProject(projectDTO: IProjectDTO): Promise<IProjectDTO> {
        const projectManager = projectDTO.projectManagerId
            ? await this.userRepository.findById(projectDTO.projectManagerId)
            : null;
        const projectAssistant = projectDTO.projectAssistantId
            ? await this.userRepository.findById(projectDTO.projectAssistantId)
            : null;

        const projectData: Partial<IProject> = {
            name: projectDTO.name,
            description: projectDTO.description,
            memo: projectDTO.memo ? JSON.stringify(projectDTO.memo) : undefined,
            scope: projectDTO.scope ? JSON.stringify(projectDTO.scope) : undefined,
            projectManager: projectManager?._id || null,
            projectAssistant: projectAssistant?._id || null,
            status: projectDTO.status as any,
            startDate: projectDTO.startDate,
            finishDate: projectDTO.finishDate,
        };

        const project = await this.projectRepository.create(projectData);
        return this.toDTO(project);
    }

    async updateProject(projectId: string, projectDTO: IProjectDTO): Promise<IProjectDTO | null> {
        const project = await this.projectRepository.findById(projectId);
        if (!project) throw new Error('Project not found');

        if (projectDTO.projectManagerId !== undefined) {
            const projectManager = projectDTO.projectManagerId
                ? await this.userRepository.findById(projectDTO.projectManagerId)
                : null;
            project.projectManager = projectManager?._id || null;
        }

        if (projectDTO.projectAssistantId !== undefined) {
            const projectAssistant = projectDTO.projectAssistantId
                ? await this.userRepository.findById(projectDTO.projectAssistantId)
                : null;
            project.projectAssistant = projectAssistant?._id || null;
        }

        if (projectDTO.status !== undefined) {
            project.status = projectDTO.status as any;
        }

        if (projectDTO.memo !== undefined) {
            project.memo = projectDTO.memo ? JSON.stringify(projectDTO.memo) : undefined;
        }

        if (projectDTO.scope !== undefined) {
            project.scope = projectDTO.scope ? JSON.stringify(projectDTO.scope) : undefined;
        }

        Object.assign(project, projectDTO);
        const updatedProject = await this.projectRepository.updateById(projectId, project);
        return updatedProject ? this.toDTO(updatedProject) : null;
    }

    async getProjectById(projectId: string): Promise<IProjectDTO | null> {
        const project = await this.projectRepository.findById(projectId);
        if (!project) return null;

        const projectManager = project.projectManager
            ? await this.userRepository.findById((project.projectManager as Types.ObjectId).toHexString())
            : null;
        const projectAssistant = project.projectAssistant
            ? await this.userRepository.findById((project.projectAssistant as Types.ObjectId).toHexString())
            : null;

        return this.toDTO({
            ...project.toObject(),
            projectManager: projectManager?._id || null,
            projectAssistant: projectAssistant?._id || null,
        } as IProject);
    }

    async listAllProjects(): Promise<IProjectDTO[]> {
        const projects = await this.projectRepository.findAll();
        return Promise.all(projects.map(async (project) => {
            const projectManager = project.projectManager
                ? await this.userRepository.findById((project.projectManager as Types.ObjectId).toHexString())
                : null;
            const projectAssistant = project.projectAssistant
                ? await this.userRepository.findById((project.projectAssistant as Types.ObjectId).toHexString())
                : null;

            return this.toDTO({
                ...project.toObject(),
                projectManager: projectManager?._id || null,
                projectAssistant: projectAssistant?._id || null,
            } as IProject);
        }));
    }

    async deleteProject(projectId: string): Promise<void> {
        await this.projectRepository.deleteById(projectId);
    }

    private toDTO(project: IProject): IProjectDTO {
        return {
            id: project._id.toHexString(),
            _id: project._id.toHexString(),
            name: project.name,
            description: project.description,
            memo: project.memo ? JSON.parse(project.memo) : undefined,
            scope: project.scope ? JSON.parse(project.scope) : undefined,
            projectManagerId: project.projectManager ? (project.projectManager as Types.ObjectId).toHexString() : null,
            projectAssistantId: project.projectAssistant ? (project.projectAssistant as Types.ObjectId).toHexString() : null,
            startDate: project.startDate,
            finishDate: project.finishDate,
            status: project.status,
        };
    }
}
