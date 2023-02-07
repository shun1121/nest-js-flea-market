import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemReppository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemReppository])], //repositoryの登録の際はforfeatureを使う
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
