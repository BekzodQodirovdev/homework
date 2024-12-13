import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Model } from 'mongoose';
import { Comment } from './entities/comment.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comments') private commentModel: Model<Comment>) {}
  create(createCommentDto: CreateCommentDto) {
    const commentData = new this.commentModel(createCommentDto);
    return commentData;
  }

  async findAll() {
    const commentData = await this.commentModel.find();
    return commentData;
  }

  async findOne(id: string) {
    const commentData = await this.commentModel.findOne({ _id: id });
    return commentData;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const commentData = await this.commentModel.findOneAndUpdate(
      { _id: id },
      updateCommentDto,
    );
    return commentData;
  }

  async remove(id: string) {
    const commentData = await this.commentModel.findOneAndDelete({ _id: id });
    return commentData;
  }
}
