import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardCreateReqDto } from './dto/req/board.create.req.dto';

@Controller('board')
export class BoardController {
  private boardService: BoardService;
  constructor(boardService: BoardService) {
    this.boardService = boardService;
  }
  @Post('create')
  createBoard(@Body() boardCreateReqDto: BoardCreateReqDto) {
    this.boardService.create(boardCreateReqDto);
  }
}
