import * as SequelizeStatic from 'sequelize';
import { Sequelize, DataTypes, Instance } from 'sequelize';

import { Frequency } from '../../../common/dictionary';
import Show from './show';

export interface ISeasonAttributes {
  id: number;
  showId: number;
  frequency: Frequency;
  number: number;
}

export interface ISeasonInstance extends Instance<ISeasonAttributes> {
  dataValues: ISeasonAttributes;
}

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<ISeasonInstance, ISeasonAttributes> => {
    const Season = sequelize.define<ISeasonInstance, ISeasonAttributes>(
      'Season',
      {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        showId: { type: dataTypes.STRING, allowNull: false },
        frequency: { type: dataTypes.STRING(12), allowNull: false },
        number: { type: dataTypes.INTEGER, allowNull: false },
      },
      {
        comment: 'Seasons for shows',
      },
    );

    Season.belongsTo(sequelize.models.Show,
      {
        foreignKeyConstraint: true,
        foreignKey: 'showId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      },
    );

    return Season;
};
