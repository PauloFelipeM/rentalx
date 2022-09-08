import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

@injectable()
class GetAllSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.getAll();
    return specifications;
  }
}

export { GetAllSpecificationUseCase };
