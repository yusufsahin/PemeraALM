import { inject, injectable } from 'inversify';
import { IAuthService } from "../abstract/IAuthService";
import { IUserRepository } from "../../repositorites/abstract/IUserRepository";
import { IPrivilegeRepository } from "../../repositorites/abstract/IPrivilegeRepository";
import { IRoleRepository } from "../../repositorites/abstract/IRoleRepository";
import { LoginDTOReq, LoginDTORes, RegisterDTOReq, RegisterDTORes } from "../../dto/IAuthDTO";
import { NotFoundError, ValidationError } from "../../errors/CustomErrors";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "../../models/User";
import {FilterQuery, Types} from 'mongoose';
import { IRole } from "../../models/Role";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository,
        @inject('IRoleRepository') private roleRepository: IRoleRepository,
        @inject('IPrivilegeRepository') private privilegeRepository: IPrivilegeRepository
    ) {}

    public async register(registerDTO: RegisterDTOReq): Promise<RegisterDTORes> {
        const { username, email, password } = registerDTO;

        // Check if the user already exists by email or username
        const existingUser = await this.userRepository.findOne({
            $or: [{ email }, { username }]
        } as FilterQuery<IUser>);

        if (existingUser) {
            throw new ValidationError('User already exists with this email or username.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Get the default role
        const defaultRole = await this.roleRepository.findOne({ name: 'Members' });

        // Create the user
        const user = await this.userRepository.create({
            firstname: registerDTO.firstname!,
            lastname: registerDTO.lastname!,
            username,
            email,
            password: hashedPassword,
            roles: defaultRole ? [defaultRole._id] : []
        });
        return {
            _id: user._id.toHexString(),
            id: user._id.toHexString(),
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };
    }

    public async login(loginDTO: LoginDTOReq): Promise<LoginDTORes> {
        const { identifier, password } = loginDTO;

        // Create the query object with FilterQuery<IUser>
        const query: FilterQuery<IUser> = {
            $or: [{ username: identifier }, { email: identifier }]
        };

        const user = await this.userRepository.findOne(query);

        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Populate roles and privileges manually using PrivilegeRepository
        await this.populateUserRolesWithPrivileges(user);

        // Ensure the user's password is defined
        if (!user.password) {
            throw new ValidationError('User password is missing');
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ValidationError('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            token,
            user: {
                _id: user._id.toHexString(),
                id: user._id.toHexString(),
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
            },
        };
    }

    private async populateUserRolesWithPrivileges(user: IUser): Promise<void> {
        const populatedRoles: { [key: string]: IRole } = {};

        if (user.roles && user.roles.length > 0) {
            for (let i = 0; i < user.roles.length; i++) {
                const role = user.roles[i] as IRole;
                if (role && role.name && !populatedRoles[role.name]) {
                    // Fetch privileges based on the role's privileges array (if they are ObjectIds)
                    if (role.privileges && role.privileges.length > 0) {
                        const privilegeIds = role.privileges as Types.ObjectId[];
                        role.privileges = await this.privilegeRepository.findByIds(privilegeIds);
                    }
                    populatedRoles[role.name] = role;
                }
            }

            // Replace user.roles with unique, populated roles
            user.roles = Object.values(populatedRoles);
        }
    }



    public generateToken(user: IUser): string {
        // Cast `user` to a type that includes populated roles and privileges
        const populatedUser = user as IUser & { roles: (IRole & { privileges: { name: string }[] })[] };
        return generateToken(populatedUser);
    }

    public verifyToken(token: string): IUser | null {
        return verifyToken(token);
    }
}
