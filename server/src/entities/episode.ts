import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Frequency } from '../../../common/dictionary';
import { Season, ISeason } from './season';

export interface IEpisode {
  id: number;
  season: ISeason;
  premiereDate: Date;
  number: number;
}

@Entity()
export class Episode implements IEpisode {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne((type) => Season, (season) => season.episodes, {
    cascadeAll: true,
  })
  public season: Season;
  @Column({
    type: 'date',
  })
  public premiereDate: Date;
  @Column({
    type: 'int',
    length: 3,
  })
  public number: number;
}
