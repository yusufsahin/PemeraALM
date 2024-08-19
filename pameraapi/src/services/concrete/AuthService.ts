import { inject, injectable } from 'inversify';
import { IAuthService } from "../abstract/IAuthService";
import { IUserRepository } from "../../repositorites/abstract/IUserRepository";
import { LoginDTOReq, LoginDTORes, RegisterDTOReq, RegisterDTORes } from "../../dto/IAuthDTO";
import { NotFoundError, ValidationError } from "../../errors/CustomErrors";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "../../models/User";
import { FilterQuery } from 'mongoose';

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async register(registerDTO: RegisterDTOReq): Promise<RegisterDTORes> {
        const { username, email, password } = registerDTO;

        // Check if the user already exists by email or username
        const existingUser = await this.userRepository.findOne({
            $or: [ { email }, { username } ]
        } as FilterQuery<IUser>);  // Explicitly define the query type as FilterQuery<IUser>

        if (existingUser) {
            throw new ValidationError('User already exists with this email or username.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await this.userRepository.create({
            username,
            email,
            password: hashedPassword,
        });

        return {
            _id: user._id.toHexString(),
            id: user._id.toHexString(),
            username: user.username,
            email: user.email,
        };
    }

    public async login(loginDTO: LoginDTOReq): Promise<LoginDTORes> {
        const { identifier, password } = loginDTO;

        // Log the identifier
        //console.log("Identifier:", identifier);

        // Create the query
        const query: FilterQuery<IUser> = {
            $or: [{ username: identifier }, { email: identifier }]
        };

        // Log the query
        //console.log("Query:", JSON.stringify(query));

        // Execute the query
        const user = await this.userRepository.findOne(query);

        // Log the user
        //console.log("User found:", user);

        if (!user) {
            throw new NotFoundError('User not found');
        }

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
                username: user.username,
                email: user.email,
            },
        };
    }



    public generateToken(user: IUser): string {
        return generateToken(user);
    }

    public verifyToken(token: string): IUser | null {
        return verifyToken(token);
    }
}
