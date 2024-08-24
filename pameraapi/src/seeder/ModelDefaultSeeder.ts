import { inject, injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { IRoleRepository } from "../repositorites/abstract/IRoleRepository";
import { IUserRepository } from "../repositorites/abstract/IUserRepository";
import { IPrivilegeRepository } from "../repositorites/abstract/IPrivilegeRepository";

@injectable()
export class ModelDefaultSeeder {
    constructor(
        @inject('IRoleRepository') private roleRepository: IRoleRepository,
        @inject('IUserRepository') private userRepository: IUserRepository,
        @inject('IPrivilegeRepository') private privilegeRepository: IPrivilegeRepository
    ) {}

    public async seedDefaults(): Promise<void> {
        const roles = ['Members', 'Administrators'];
        const privileges = [
            { name: 'READ_PRIVILEGE', description: 'Permission to read content' },
            { name: 'WRITE_PRIVILEGE', description: 'Permission to write content' },
            { name: 'DELETE_PRIVILEGE', description: 'Permission to delete content' },
        ];

        // Seed privileges if they don't exist
        for (const privilegeData of privileges) {
            let existingPrivilege = await this.privilegeRepository.findByName(privilegeData.name);
            if (!existingPrivilege) {
                existingPrivilege = await this.privilegeRepository.create(privilegeData);
                console.log(`Privilege ${privilegeData.name} created.`);
            }
        }

        // Seed roles if they don't exist
        for (const roleName of roles) {
            let existingRole = await this.roleRepository.findByName(roleName);
            if (!existingRole) {
                existingRole = await this.roleRepository.create({ name: roleName });
                console.log(`Role ${roleName} created.`);
            }
        }

        // Find roles and privileges by name
        const adminRole = await this.roleRepository.findByName('Administrators');
        const memberRole = await this.roleRepository.findByName('Members');
        const readPrivilege = await this.privilegeRepository.findByName('READ_PRIVILEGE');
        const writePrivilege = await this.privilegeRepository.findByName('WRITE_PRIVILEGE');
        const deletePrivilege = await this.privilegeRepository.findByName('DELETE_PRIVILEGE');

        // Check for missing roles or privileges
        if (!adminRole || !memberRole || !readPrivilege || !writePrivilege || !deletePrivilege) {
            throw new Error('Required roles or privileges not found.');
        }

        // Ensure privileges are correctly assigned to the Administrators role
        const adminPrivilegesSet = new Set(adminRole.privileges.map(p => p.toString()));
        const requiredAdminPrivileges = [readPrivilege._id.toString(), writePrivilege._id.toString(), deletePrivilege._id.toString()];

        if (!requiredAdminPrivileges.every(priv => adminPrivilegesSet.has(priv))) {
            adminRole.privileges = Array.from(new Set([...adminRole.privileges, ...requiredAdminPrivileges.map(id => new Types.ObjectId(id))]));
            await this.roleRepository.updateById(adminRole._id.toString(), { privileges: adminRole.privileges });
            console.log('Privileges assigned to Administrators role.');
        }

        // Ensure privileges are correctly assigned to the Members role
        const memberPrivilegesSet = new Set(memberRole.privileges.map(p => p.toString()));
        const requiredMemberPrivileges = [readPrivilege._id.toString()];

        if (!requiredMemberPrivileges.every(priv => memberPrivilegesSet.has(priv))) {
            memberRole.privileges = Array.from(new Set([...memberRole.privileges, ...requiredMemberPrivileges.map(id => new Types.ObjectId(id))]));
            await this.roleRepository.updateById(memberRole._id.toString(), { privileges: memberRole.privileges });
            console.log('Privileges assigned to Members role.');
        }

        // Create default administrator user if not exists
        let existingAdmin = await this.userRepository.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('password', 10); // Default password: 'password'
            existingAdmin = await this.userRepository.create({
                username: 'admin',
                email: 'admin@example.com',
                firstname: 'Admin',
                lastname: 'User',
                password: hashedPassword,
                roles: [adminRole._id],  // Store ObjectId
            });
            console.log('Default Administrator user created.');
        } else {
            // Ensure roles array is defined
            existingAdmin.roles = existingAdmin.roles || [];

            console.log(`Checking if admin user has Administrator role...`); // Debugging line
            console.log(`Admin Role ID: ${adminRole._id.toString()}`);
            console.log(`Existing Admin Roles: ${existingAdmin.roles.map((roleId: any) => (typeof roleId === 'object' && '_id' in roleId ? roleId._id.toString() : roleId.toString())).join(', ')}`);

            // Compare using string representation of ObjectId
            if (!existingAdmin.roles.some((roleId: any) => (typeof roleId === 'object' && '_id' in roleId ? roleId._id.toString() : roleId.toString()) === adminRole._id.toString())) {
                console.log(`Administrator role not found. Assigning role to admin user...`); // Debugging line
                existingAdmin.roles.push(adminRole._id);  // Push ObjectId
                await this.userRepository.updateById(existingAdmin._id.toString(), { roles: existingAdmin.roles });
                console.log('Administrator role assigned to existing admin user.');
            } else {
                console.log('Administrator role already assigned to existing admin user.');
            }
        }

        // Create test user with Members role if not exists
        let existingTestUser = await this.userRepository.findOne({ username: 'test-user' });
        if (!existingTestUser) {
            const hashedPassword = await bcrypt.hash('password', 10); // Default password: 'password'
            await this.userRepository.create({
                firstname: 'Test',
                lastname: 'User',
                username: 'test-user',
                email: 'test-user@example.com',
                password: hashedPassword,
                roles: [memberRole._id],  // Store ObjectId
            });
            console.log('Test user with Members role created.');
        } else {
            console.log('Test user already exists.');
        }
    }
}
