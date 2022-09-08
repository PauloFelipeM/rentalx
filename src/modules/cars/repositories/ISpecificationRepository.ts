import { Specification } from '../infra/typeorm/entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
  getAll(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
