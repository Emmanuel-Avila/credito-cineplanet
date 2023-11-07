import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comercios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;
}