import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../../../repositories/ISpecificationRepository';

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create(data: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create(data);
    await this.repository.save(specification);
  }

  async getAll(): Promise<Specification[]> {
    return await this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return await this.repository.findByIds(ids);
  }
}

export { SpecificationRepository };
