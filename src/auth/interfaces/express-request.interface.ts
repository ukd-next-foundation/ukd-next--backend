import { Request } from 'express';
import { UserEntity } from '@core/users/entities/user.entity';

export interface IExpressRequest extends Request {
  user?: UserEntity | null;
}
