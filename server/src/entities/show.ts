import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

import { Category } from '../../../common/dictionary';
import { Season } from './season';

export interface IShow {
  id: string;
  category: Category;
  name: string;
  downloadUrl: string;
}

@Entity()
export class Show implements IShow {
  @PrimaryColumn({
    comment: 'slug',
    length: 256,
  })
  public id: string;
  @Column({
    type: 'string',
    length: 10,
  })
  public category: Category;
  @Column({
    length: 256,
  })
  public name: string;
  @Column({
    length: 256,
  })
  public downloadUrl: string;
  @OneToMany(type => Season, season => season.show, {
    cascadeInsert: true,
    cascadeUpdate: true,
  })
  public seasons: Season[];
}
