import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-tests'),
    UserModule,
    CommentsModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
