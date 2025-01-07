import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Gender } from 'src/enum/gender';
import { Roles } from 'src/enum/role';

@Table({ tableName: 'USER' })
export class Auth extends Model {
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id: number;

  @Column
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column
  age: number;

  @Column({
    type: DataType.ENUM(...Object.values(Gender)),
    defaultValue: Gender.male,
  })
  gender: Gender;

  @Column({
    type: DataType.ENUM(...Object.values(Roles)),
    defaultValue: Roles.user,
  })
  role: Roles;

  refreshtoken?: string;
}
