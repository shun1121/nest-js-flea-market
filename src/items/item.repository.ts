import { Item } from 'src/entities/item.entity'; //modelのItemではないことに注意
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Item) //扱いたいエンティティーのクラスを引数に渡す。↓型にItemエンティティーをジェネリクスで指定。
export class ItemReppository extends Repository<Item>{ //extendsでデータベースとのやりとりをするのに必要なメソッドを利用できる

}