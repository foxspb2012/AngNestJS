import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ITour } from '../interfaces/tour';

@Controller('tours')
export class ToursController {
  constructor(private toursService: ToursService) {
  }

  @Post()
  initTours(): Promise<ITour[]> {
    return this.toursService.generateTours();
  }

  @Get()
  getAllTours(): Promise<ITour[]> {
    return this.toursService.getAllTours();
  }

  @Get(":id")
  getTourById(@Param("id") id): Promise<ITour> {
    return this.toursService.getTourById(id);
  }

  @Delete()
  removeAllTours(): Promise<any> {
    return this.toursService.deleteTours();
  }
}
