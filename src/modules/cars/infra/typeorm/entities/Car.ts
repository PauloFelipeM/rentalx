import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean = true;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Car };
