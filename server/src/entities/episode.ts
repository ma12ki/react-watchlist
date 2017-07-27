import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

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
  @PrimaryColumn()
  public id: number;
  @ManyToOne(type => Season, season => season.episodes, {
    cascadeAll: true,
  })
  public season: Season;
  @Column()
  public premiereDate: Date;
  @Column()
  public number: number;
}
