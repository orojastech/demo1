import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/createAlbum')
  createAlbum(@Body() createAlbumDto: any): any {
    return this.appService.createAlbum();
  }
  @Get()
  getProduct(code): any {
    return this.appService.getProduct(code);
  }
  @Get("/allAlbums")
  getAllAlbums(): any {
    return this.appService.getAllAlbums();
  }
  @Get("/albumsByUser")
  getAlbums(@Query('userId') userId): any {
    return this.appService.getAlbumsByUser(userId);
  }
}
