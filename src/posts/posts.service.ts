import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel('posts') private postModel: Model<Post>) {}
  create(createPostDto: CreatePostDto) {
    const postData = new this.postModel(createPostDto);
    return postData;
  }

  async findAll() {
    const postData = await this.postModel.find();
    return postData;
  }

  async findOne(id: string) {
    const postData = await this.postModel.findOne({ _id: id });
    return postData;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const postData = await this.postModel.findOneAndUpdate(
      { _id: id },
      updatePostDto,
    );
    return postData;
  }

  async remove(id: string) {
    const postData = await this.postModel.findOneAndDelete({ _id: id });
    return postData;
  }
}
