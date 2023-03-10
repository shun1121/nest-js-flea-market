import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ItemRepository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  // AuthModuleのexportsの中身をここで使えるようになる。
  imports: [TypeOrmModule.forFeature([ItemRepository]), AuthModule], //repositoryの登録の際はforfeatureを使う
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
