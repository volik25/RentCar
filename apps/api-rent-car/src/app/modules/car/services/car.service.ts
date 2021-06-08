import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateCarDTO } from '@rent/interfaces/modules/car/dtos/update.car.dto';
import { CarEntity } from '@rent/interfaces/modules/car/entities/car.entity';
import { logger } from '@rent/interfaces/modules/logger/logger';

@Injectable()
export class CarService {
    async find() {
        try {
            const cars = await CarEntity.find();
            return cars;
        } catch (err) {
            logger.error('[CarService]: find: ', err);
            throw new BadRequestException(err.message);
        }
    }

    async findOne(id) {
        try {
            const car = await CarEntity.findOne(id);
            return car;
        } catch (err) {
            logger.error('[CarService]: findOne: ', err);
            throw new BadRequestException(err.message);
        }
    }

    async create(car: CarEntity) {
        try {
            const carModel: CarEntity = await car.save();
            return carModel;
        } catch (err) {
            logger.error('[CarService]: create: ', err);
            throw new BadRequestException(err.message);
        }
    }

    async update(id, body: UpdateCarDTO) {
        try {
            await CarEntity.update({ id }, body);
            return {};
        } catch (err) {
            logger.error('[CarService]: update:', err);
            throw new BadRequestException(err.message);
        }
    }

    async delete(id) {
        try {
            await CarEntity.delete(id);
            return {};
        } catch (err) {
            logger.error('[CarService]: delete:', err);
            throw new BadRequestException(err.message);
        }
    }
}
