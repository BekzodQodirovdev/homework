import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'COURSE' })
export class Course extends Model {
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
  @Column
  description: string;
  @Column
  category_id: string;
}
