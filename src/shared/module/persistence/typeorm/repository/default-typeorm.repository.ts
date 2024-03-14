import { DataSource, EntityTarget, ObjectLiteral, Repository } from 'typeorm'

export class DefaultTypeOrmRepository<
  T extends ObjectLiteral,
> extends Repository<T> {
  private repository: Repository<T>

  constructor(
    private readonly model: EntityTarget<T>,
    private readonly dataSource: DataSource,
  ) {
    super(model, dataSource.createEntityManager())
    this.repository = dataSource.getRepository(model)
  }

  async deleteAll(): Promise<void> {
    const entities = await this.repository.find()
    await this.repository.remove(entities)
  }
}
