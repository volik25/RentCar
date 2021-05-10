import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CommentController } from './controllers/comment.controller';
import { CarService } from './services/car.service';
import { CommentService } from './services/comment.service';

@Module({
    controllers: [CarController, CommentController],
    providers: [CarService, CommentService]
})
export class CarModule {}
