import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { BoardCreateReqDto } from './dto/req/board.create.req.dto';
import { BoardReadReqDto } from './dto/req/board.read.req.dto';

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
    const data: BoardEntity = await this.boardEntity.findOne({
      select: {
        id: false,
        title: false,
        content: true,
      },
      where: {
        id: boardReadReqDto.id,
        title: boardReadReqDto.title,
      },
    });
    if (!data) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return data;
  }
}
