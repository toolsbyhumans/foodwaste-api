import { SetMetadata } from '@nestjs/common';

// The decorator adds metadata to routes, specifying the required roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
