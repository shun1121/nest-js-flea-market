import { User } from '../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User) //扱いたいEntityのクラス
export class UserRepository extends Repository<User> {
  // 新規にuserを作成する処理。phadminにはuserに必要なカラムが登録されている状態。新規追加で必要なカラムを記入
  async createUser(CreateUserDto: CreateUserDto): Promise<User> {
    const { username, password, status } = CreateUserDto;
    const salt = await bcrypt.genSalt(); //ハッシュ値の強度を高める文字列 ハッシュ化する前のパスワードに付与すると、ハッシュ値の復元をより難しくできる
    const hashPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashPassword, status });

    await this.save(user); //saveメソッドでデータベースに登録
    return user;
  }
}
