import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateReqDto } from './dto/req/board.create.req.dto';
import { BoardReadReqDto } from './dto/req/board.read.req.dto';

@Controller('board')
export class BoardController {
  private boardService: BoardService;
  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }
  @Post('create')
  createBoard(@Body() boardCreateReqDto: BoardCreateReqDto) {
    return this.boardService.create(boardCreateReqDto);
  }
  @Get('read')
  readBoard(@Query() boardReadReqDto: BoardReadReqDto) {
    return this.boardService.readBoard(boardReadReqDto);
  }
}
