import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item-status.enum';
import { Item } from '../entities/item.entity'; //item.model.tsからitem.entity.tsに変更なんで？
import { ItemReppository } from './item.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ItemsService {
  constructor(private readonly ItemRepository: ItemReppository) {} //ItemRepositoryをDI
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.ItemRepository.find();
  }

  async findById(id: string): Promise<Item> {
    const found = await this.ItemRepository.findOne(id); //itemRepositoryの中のメソッド, ItemRepositoryにそんなめそっである？
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(CreateItemDto: CreateItemDto, user: User): Promise<Item> {
    //商品オブジェクトの作成はrepositoryに移したのでserviceから削除
    return await this.ItemRepository.createItem(CreateItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);
    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません。');
    }
    item.updatedAt = new Date().toISOString();
    item.status = ItemStatus.SOLD_OUT;
    await this.ItemRepository.save(item); //オブジェクトの保存はsaveメソッド
    return item;
  }

  async delete(id: string): Promise<void> {
    await this.ItemRepository.delete({ id });
  }
}
