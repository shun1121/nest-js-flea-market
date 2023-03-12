import { Test } from '@nestjs/testing';
import { ItemReppository } from './item.repository';
import { ItemsService } from './items.service';

const mockItemRepository = () => ({});
// ItemsServiceはクラスなのでインスタンス化が必要
// ItemsServiceはItemRepositoryにも依存しているからそのインスタンス化も必要
describe('ItemServiceTest', () => {
  let itemsService;
  let itemRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          // データベースとの接続は行わないからItemRepositoryはmock化する必要がある。↓使用方法
          provide: ItemReppository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    // moduleからItemsServiceとItemRepositoryのインスタンスを受け取る。
    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemReppository>(ItemReppository);
  });
});
