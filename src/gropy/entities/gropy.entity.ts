import { Column, DataType, Model } from 'sequelize-typescript';
export class Gropy extends Model {
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
  course_id: string;

  @Column
  price: string;

  @Column
  start_date: string;

  @Column
  room: string;

  @Column
  end_date: string;

  @Column
  students: string;

  @Column
  teacher: string;
}
