import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item-status.enum';
import { ItemRepository } from './item.repository';
import { ItemsService } from './items.service';

const mockItemRepository = () => ({
  find: jest.fn(), //findというmock関数を定義
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
});

const mockUser1 = {
  id: '1',
  username: 'test1',
  password: '1234',
  status: UserStatus.PREMIUM,
};

const mockUser2 = {
  id: '2',
  username: 'test2',
  password: '1234',
  status: UserStatus.FREE,
};

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
          provide: ItemRepository,
          useFactory: mockItemRepository,
        },
      ],
    }).compile();

    // moduleからItemsServiceとItemRepositoryのインスタンスを受け取る。
    itemsService = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<ItemRepository>(ItemRepository);
  });

  describe('findAll', () => {
    const expected = [];
    it('正常系', async () => {
      itemRepository.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };

      itemRepository.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById('test-id');
      expect(result).toEqual(expected);
    });

    it('異常系: 商品が存在しない', async () => {
      itemRepository.findOne.mockResolvedValue(null);
      await expect(itemsService.findById('test-id')).rejects.toThrow(
        NotFoundException, //発生する例外を記述
      );
    });
  });

  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        description: '',
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };
      itemRepository.createItem.mockResolvedValue(expected);
      const result = await itemsService.create({
        name: 'PC',
        price: 50000,
        describe: '',
        mockUser1,
      });
      expect(result).toEqual(expected);
    });
  });

  describe('updateStatus', () => {
    const mock = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      description: '',
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };
    it('正常系', async () => {
      itemRepository.findOne.mockResolvedValue(mock);
      await itemsService.updateStatus('test-id', mockUser2);
      expect(itemRepository.save).toHaveBeenCalled();
    });

    it('異常系: 自身の商品を購入', async () => {
      itemRepository.findOne.mockResolvedValue(mock);
      await expect(
        itemsService.updateStatus('test-id', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
