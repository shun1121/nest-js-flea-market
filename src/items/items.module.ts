import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ItemReppository } from './item.repository';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  // AuthModuleのexportsの中身をここで使えるようになる。
  imports: [TypeOrmModule.forFeature([ItemReppository]), AuthModule], //repositoryの登録の際はforfeatureを使う
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
