export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    avatarPublicId: string;
    createdAt: Date;
    updatedAt?: Date;
}

export interface AuthenticateUserRequest {
    email: string;
    password: string;
}

export interface AuthenticateUserResponse {
    user: Omit<User, 'password'>;
}

export interface CreatedUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface UpdatedUserData {
    name?: string;
    email?: string;
    avatarUrl?: string;
    avatarPublicId?: string;
    password?: string;
}

export interface UpdateUserRequest {
    id: string;
    name?: string;
}

export interface UploadUserAvatarRequest {
    idUser: string;
    imageBuffer: Buffer;
    mimetype: string;
    size: number;
}

export interface UploadUserAvatarResponse {
    user: Omit<User, 'password'>;
}

export interface UpdateUserResponse {
    newUser: User | null;
}