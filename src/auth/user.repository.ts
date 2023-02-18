import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User) //扱いたいEntityのクラス
export class UserRepository extends Repository<User> {
  // 新規にuserを作成する処理。phadminにはuserに必要なカラムが登録されている状態。新規追加で必要なカラムを記入
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = CreateUserDto;
    const user = this.create({ username, password, status });

    await this.save(user); //saveメソッドでデータベースに登録
    return user;
  }
}
