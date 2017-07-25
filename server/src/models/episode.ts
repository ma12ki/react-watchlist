import * as SequelizeStatic from 'sequelize';
import { Sequelize, DataTypes, Instance } from 'sequelize';

import Season from './season';

export interface IEpisodeAttributes {
  id: number;
  premiereDate: Date;
  number: number;
}

export interface IEpisodeInstance extends Instance<IEpisodeAttributes> {
  dataValues: IEpisodeAttributes;
}

export default (sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<IEpisodeInstance, IEpisodeAttributes> => {
    const Episode = sequelize.define<IEpisodeInstance, IEpisodeAttributes>(
      'Episodde',
      {
        id: { type: dataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        seasonId: { type: dataTypes.INTEGER },
        premiereDate: { type: dataTypes.DATEONLY, allowNull: false },
        number: { type: dataTypes.INTEGER, allowNull: false },
      },
      {
        comment: 'Episodes for seasons',
      },
    );

    Episode.belongsTo(sequelize.models.Season,
      {
        foreignKeyConstraint: true,
        foreignKey: 'seasonId',
        targetKey: 'id',
        onDelete: 'CASCADE',
      },
    );

    return Episode;
};
