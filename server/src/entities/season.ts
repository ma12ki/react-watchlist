import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

import { Frequency } from '../../../common/dictionary';
import { Show, IShow } from './show';
import { Episode, IEpisode } from './episode';

export interface ISeason {
  id: number;
  show: IShow;
  episodes: IEpisode[];
  frequency: Frequency;
  number: number;
}

@Entity()
export class Season implements ISeason {
  @PrimaryGeneratedColumn()
  public id: number;
  @ManyToOne((type) => Show, (show) => show.seasons, {
    cascadeAll: true,
  })
  public show: Show;
  @OneToMany((type) => Episode, (episode) => episode.season, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  public episodes: Episode[];
  @Column({
    type: 'string',
    length: 10,
  })
  public frequency: Frequency;
  @Column({
    type: 'int',
    length: 2,
  })
  public number: number;
}
