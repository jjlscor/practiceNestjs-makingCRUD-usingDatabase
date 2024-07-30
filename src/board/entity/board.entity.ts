import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
}
