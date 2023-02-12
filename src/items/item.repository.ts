import { Item } from 'src/entities/item.entity'; //modelのItemではないことに注意
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';

// repositoryはtypeorm経由でモジュールに追加する。items.module.ts
@EntityRepository(Item) //扱いたいエンティティーのクラスを引数に渡す。↓型にItemエンティティーをジェネリクスで指定。
export class ItemReppository extends Repository<Item> {
  //↑extendsでデータベースとのやりとりをするのに必要なメソッドを利用できる

  async createItem(CreateItemDto: CreateItemDto): Promise<Item> {
    //↑データベース操作は非同期なのでasync
    const { name, price, description } = CreateItemDto;
    //↓itemrepositoryの親クラスのrepositoryクラスのcreateメソッドを使用
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    //itemオブジェクトをデータへー巣に登録するためにrepositoryクラスのsaveメソッドを使用
    await this.save(item);
    return item;
  }
}

//errorの原因はデータベースにitemテーブルを追加していなかったから
//マイグレーションファイルを作成した後、npx typeorm migration:runコマンドでデータベースにテーブルを反映させる
