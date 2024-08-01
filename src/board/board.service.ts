import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { BoardCreateReqDto } from './dto/req/board.create.req.dto';
import { BoardReadReqDto } from './dto/req/board.read.req.dto';
import { BoardUpdateReqBodyDto } from './dto/req/board.update.req.body.dto';
import { BoardUpdateReqQueryDto } from './dto/req/board.update.req.query.dto';
import { BoardUpdateResDto } from './dto/res/board.update.res.dto';
import { BoardReadResDto } from './dto/res/board.read.res.dto';
import { BoardDeleteReqDto } from './dto/req/board.delete.req.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardEntity: Repository<BoardEntity>,
  ) {}
  async create(boardCreateReqDto: BoardCreateReqDto) {
    const board: BoardEntity = new BoardEntity();
    board.title = boardCreateReqDto.title;
    board.content = boardCreateReqDto.content;

    const result: BoardEntity = await this.boardEntity.save(board);
    console.log(result);
    return true;
  }
  async readBoard(boardReadReqDto: BoardReadReqDto) {
    const data: BoardReadResDto = await this.boardEntity.findOne({
      select: {
        id: false,
        title: true,
        content: true,
      },
      where: {
        id: boardReadReqDto.id,
      },
    });
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return data;
  }
  async updateBoard(
    query: BoardUpdateReqQueryDto,
    body: BoardUpdateReqBodyDto,
  ) {
    const board = await this.boardEntity.findOne({
      where: {
        id: query.id,
      },
    });
    if (!board) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.boardEntity.update(board.id, body);
    const updateboard: BoardUpdateResDto = await this.boardEntity.findOne({
      where: {
        id: query.id,
      },
    });
    return updateboard;
  }
  async deleteBoard(query: BoardDeleteReqDto) {
    const data = await this.boardEntity.findOne({
      select: {
        id: true,
        title: false,
        content: false,
      },
      where: {
        id: query.id,
        title: query.title,
      },
    });
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    await this.boardEntity.delete(data);
    return true;
  }
}
