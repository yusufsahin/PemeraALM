import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';

import { Types } from 'mongoose';
import {IRoleRepository} from "../repositorites/abstract/IRoleRepository";
import {IUserRepository} from "../repositorites/abstract/IUserRepository";

@injectable()
export class RoleSeeder {
    constructor(
        @inject('IRoleRepository') private roleRepository: IRoleRepository,
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async seedRolesAndAdmin(): Promise<void> {
        const roles = ['Members', 'Administrators'];

        // Seed roles if they don't exist
        for (const roleName of roles) {
            let existingRole = await this.roleRepository.findByName(roleName);
            if (!existingRole) {
                existingRole = await this.roleRepository.create({ name: roleName });
                console.log(`Role ${roleName} created.`);
            }
        }

        // Find roles by name
        const adminRole = await this.roleRepository.findByName('Administrators');
        const memberRole = await this.roleRepository.findByName('Members');

        if (!adminRole || !memberRole) {
            throw new Error('Required roles not found.');
        }

        // Create default administrator user if not exists
        let existingAdmin = await this.userRepository.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('password', 10); // Default password: 'password'
            existingAdmin = await this.userRepository.create({
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                roles: [adminRole._id],  // Store ObjectId
            });
            console.log('Default Administrator user created.');
        } else {
            // Ensure roles array is defined
            existingAdmin.roles = existingAdmin.roles || [];
            // Ensure admin role is assigned if the user already exists
            if (!existingAdmin.roles.some(roleId => roleId.equals(adminRole._id))) {
                existingAdmin.roles.push(adminRole._id as Types.ObjectId);  // Push ObjectId
                await this.userRepository.updateById(existingAdmin._id.toString(), { roles: existingAdmin.roles });
            }
        }

        // Create test user with Members role if not exists
        let existingTestUser = await this.userRepository.findOne({ username: 'test-user' });
        if (!existingTestUser) {
            const hashedPassword = await bcrypt.hash('password', 10); // Default password: 'password'
            await this.userRepository.create({
                username: 'test-user',
                email: 'test-user@example.com',
                password: hashedPassword,
                roles: [memberRole._id as Types.ObjectId],  // Store ObjectId
            });
            console.log('Test user with Members role created.');
        }
    }
}

