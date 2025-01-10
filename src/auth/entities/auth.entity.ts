import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  Unique,
} from 'sequelize-typescript';
import { Gender } from '../../enum/gender';
import { Roles } from '../../enum/role';

@Table({ tableName: 'USER' })
export class Auth extends Model<Auth> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    unique: true,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
  })
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refreshtoken?: string;
}
