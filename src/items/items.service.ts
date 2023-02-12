import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity'; //item.model.tsからitem.entity.tsに変更なんで？
import { ItemReppository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(private readonly ItemRepository: ItemReppository) {} //ItemRepositoryをDI
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.ItemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.ItemRepository.findOne(id); //itemRepositoryの中のメソッド
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(CreateItemDto: CreateItemDto): Promise<Item> {
    //商品オブジェクトの作成はrepositoryに移したのでserviceから削除
    return await this.ItemRepository.createItem(CreateItemDto);
  }

  // updateStatus(id: string): Item {
  //   const item = this.findById(id);
  //   item.status = ItemStatus.SOLD_OUT;
  //   return item;
  // }

  delete(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
  }
}
