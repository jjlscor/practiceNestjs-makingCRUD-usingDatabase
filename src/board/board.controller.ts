import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateReqDto } from './dto/req/board.create.req.dto';
import { BoardReadReqDto } from './dto/req/board.read.req.dto';
import { BoardUpdateReqBodyDto } from './dto/req/board.update.req.body.dto';
import { BoardUpdateReqQueryDto } from './dto/req/board.update.req.query.dto';
import { BoardDeleteReqDto } from './dto/req/board.delete.req.dto';

@Controller('board')
export class BoardController {
  private boardService: BoardService;
  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }
  @Post('create')
  async createBoard(@Body() boardCreateReqDto: BoardCreateReqDto) {
    return this.boardService.create(boardCreateReqDto);
  }
  @Get('read')
  async readBoard(@Query() boardReadReqDto: BoardReadReqDto) {
    return this.boardService.readBoard(boardReadReqDto);
  }
  @Patch('update')
  async updateBoard(
    @Query() query: BoardUpdateReqQueryDto,
    @Body() body: BoardUpdateReqBodyDto,
  ) {
    return this.boardService.updateBoard(query, body);
  }
  @Delete('delete')
  async deleteBoard(@Query() query: BoardDeleteReqDto) {
    return this.boardService.deleteBoard(query);
  }
}
