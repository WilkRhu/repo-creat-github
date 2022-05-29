import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { GitHub } from './interface/git-hub-entities';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('create-git-hub')
  async create(@Payload() data: any): Promise<any> {
    try {
      this.logger.log(data);
      const response = await this.appService.create(
        data.value.userName,
        data.value.repository,
      );
      return JSON.stringify(response);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  @MessagePattern('find-all-git-hub')
  async findAll(): Promise<GitHub[]> {
    return await this.appService.findAll();
  }
}
