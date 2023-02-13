import { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) //名前をuniqueにしたいので引数にオブジェクトで追加
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;
}
