import { Auth } from '../entities/auth.entity';

export const AtuhProviders = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Auth,
  },
];
