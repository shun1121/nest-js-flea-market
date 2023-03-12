import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //名前をuniqueにしたいので引数にオブジェクトで追加
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  //第一引数に関連先の型を返すコールバック関数。第二引数に関連先で紐づけられるプロパティを返すコールバック関数。
  @OneToMany(() => Item, (item) => item.user)
  items: Item[];
}
