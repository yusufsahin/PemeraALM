import { inject, injectable } from 'inversify';
import { IAuthService } from "../abstract/IAuthService";
import { IUserRepository } from "../../repositorites/abstract/IUserRepository";
import { LoginDTOReq, LoginDTORes, RegisterDTOReq, RegisterDTORes } from "../../dto/IAuthDTO";
import { NotFoundError, ValidationError } from "../../errors/CustomErrors";
import bcrypt from 'bcryptjs';
import { generateToken, verifyToken } from "../../utils/jwt";
import { IUser } from "../../models/User";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async register(registerDTO: RegisterDTOReq): Promise<RegisterDTORes> {
        const { username, email, password } = registerDTO;

        // Check if the user already exists
        const existingUser = await this.userRepository.findOne({ email });
        if (existingUser) {
            throw new ValidationError('User already exists with this email.');
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
            id: user._id.toHexString(),
            username: user.username,
            email: user.email,
        };
    }
    public async login(loginDTO: LoginDTOReq): Promise<LoginDTORes> {
        const { username, password } = loginDTO;

        // Find the user by username
        const user = await this.userRepository.findOne({ username });
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // Ensure the user's password is defined
        if (!user.password) {
            throw new ValidationError('User password is missing');
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password || '', user.password);
        if (!isMatch) {
            throw new ValidationError('Invalid credentials');
        }

        // Generate JWT token
        const token = this.generateToken(user);

        return {
            token,
            user: {
                id: user._id.toHexString(),
                username: user.username,
                email: user.email,
            },
        };
    }


    public generateToken(user: IUser): string {  // Change to IUser
        return generateToken(user);
    }

    public verifyToken(token: string): IUser | null {  // Change to IUser
        return verifyToken(token);
    }
}
