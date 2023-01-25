import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/aggToken')
  async getAggToken(
    @Query('chainID') chainID: number,
    @Query('address') address: string,
  ){
    return this.appService.getAggToken(chainID, address);
  }

  @Get('/masterCoins')
  async getMasterCoins() {
    return this.appService.getAllMasterCoins();
  }

  @Post('/addWatchlist')
  async addWatchlist(
    @Body('name') name: string
  ) {

    return this.appService.insertWatchlist(name);

  }

}
