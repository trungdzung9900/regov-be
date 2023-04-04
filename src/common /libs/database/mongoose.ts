import * as mongoose from 'mongoose';

export class MongooseRepository<TModel> {
  public TSchema: mongoose.Model<TModel>;

  constructor(_TSchema: mongoose.Model<TModel>) {
    this.TSchema = _TSchema;
  }

  /**
   * @method create
   * @description create new
   * @param params
   */
  async create(params: TModel): Promise<TModel> {
    return new this.TSchema(params).save();
  }

  /**
   * @method deleteByConditions
   * @param conditions
   */
  async deleteByConditions(conditions: any): Promise<TModel> {
    return this.TSchema.findOneAndDelete(conditions).exec();
  }

  /**
   * @method countByConditions
   * @param conditions
   */
  async countByConditions(conditions: any): Promise<number> {
    return this.TSchema.countDocuments(conditions);
  }

  /**
   * @method findByConditions
   * @param conditions
   */
  async findByConditions(conditions: any): Promise<TModel> {
    return this.TSchema.findOne(conditions);
  }

  /**
   * @method findALl
   */
  async findAll(): Promise<any> {
    return this.TSchema.find();
  }

  /**
   * @method update
   * @param conditions
   * @param id
   */
  async update(id: string, conditions: any): Promise<TModel> {
    return this.TSchema.findOneAndUpdate({ user_id: id }, conditions);
  }
}
