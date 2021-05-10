/* eslint-disable @typescript-eslint/ban-types */
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwt.guard';
import { CarService } from '../services/car.service';
import { CreateCarDTO } from '../../../../../../../libs/interfaces/modules/car/dtos/сreate.car.dto'
import { CarEntity } from '../../../../../../../libs/interfaces/modules/car/entities/car.entity';
import { CarFindInterface } from '../interfaces/car.find.interface';
import { SortUtil } from '../../../utils/sort.util';
import { UpdateCarDTO } from '../../../../../../../libs/interfaces/modules/car/dtos/update.car.dto';

@Controller('car')
export class CarController {

  constructor(private carService: CarService) {
  }

  @Get()
  async find(
    @Query('limit', new DefaultValuePipe('20'), ParseIntPipe) limit?: number,
    @Query('offset', new DefaultValuePipe('0'), ParseIntPipe) offset?: number,
    @Query('sort', new DefaultValuePipe('id:number')) sort?: string
  ): Promise<CarFindInterface> {
    let cars = await this.carService.find();
    cars = SortUtil.sortItems(cars, sort);

    return {
      count: cars.length,
      cars: cars.slice(offset, Number(limit) + Number(offset))
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CarEntity> {
    return await this.carService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateCarDTO): Promise<CarEntity> {
    return await this.carService.create(CarEntity.create(body));
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCarDTO): Promise<{}> {
    return await this.carService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{}> {
    return await this.carService.delete(id);
  }
}