import { Gropy } from './entities/gropy.entity';

export const gropyProviders = [
  {
    provide: 'GROPY_REPOSITORY',
    useValue: Gropy,
  },
];
