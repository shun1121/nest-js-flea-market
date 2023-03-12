import { ItemStatus } from '../items/item-status.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid') //自動採番カラム
  id: string;

  @Column() //通常のカラム
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  //商品から見てユーザは多対1。第二引数にユーザーエンティティのitemsプロパティを返すコールバック関数
  @ManyToOne(() => User, (user) => user.items)
  user: User;

  @Column()
  userId: string;
}
