import { Inject, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { Auth } from '../entities/auth.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authModel: typeof Auth,
  ) {}

  create(signUpAuthDto) {
    return this.authModel.create(signUpAuthDto);
  }

  findAll() {
    return this.authModel.findAll<Auth>();
  }

  findOne(id: number) {
    return this.authModel.findByPk(id);
  }

  findOneByEmail(email) {
    return this.authModel.findOne({ where: { email } });
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return this.authModel.update(updateAuthDto, {
      where: {
        id,
      },
    });
  }

  remove(id: number) {
    return this.authModel.destroy({
      where: {
        id,
      },
    });
  }
}
