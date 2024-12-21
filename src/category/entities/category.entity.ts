import { Table, Column, DataType, Model } from 'sequelize-typescript';

@Table({ tableName: 'CATEGORY' })
export class Category extends Model {
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
}
