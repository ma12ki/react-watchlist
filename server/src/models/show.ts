import * as SequelizeStatic from 'sequelize';
import { Sequelize, DataTypes, Instance } from 'sequelize';

import { Category } from '../../../common/dictionary';

export interface IShowAttributes {
  id: string;
  category: Category;
  name: string;
  downloadUrl: string;
}

export interface IShowInstance extends Instance<IShowAttributes> {
  dataValues: IShowAttributes;
}

export default (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<IShowInstance, IShowAttributes> => {
  const Show = sequelize.define<IShowInstance, IShowAttributes>(
    'Show',
    {
      id: { type: dataTypes.STRING, primaryKey: true, comment: 'Slug' },
      category: { type: dataTypes.STRING(10), allowNull: false },
      name: { type: dataTypes.STRING, allowNull: false, unique: true },
      downloadUrl: { type: dataTypes.STRING },
    },
    {
      comment: 'Master table for shows',
    },
  );

  return Show;
};
