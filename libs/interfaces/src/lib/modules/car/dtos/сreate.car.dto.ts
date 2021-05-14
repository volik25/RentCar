import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { AC } from '../../../enums/ac.enum';
import { BodyTypes } from '../../../enums/bodyTypes.enum';
import { FuelType } from '../../../enums/fuelTypes.enum';
import { KPP } from '../../../enums/kpp.enum';
import { SteeringType } from '../../../enums/steeringType.enum';
import { WheelDrive } from '../../../enums/wheelDrive.enum';

export class CreateCarDTO {
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    img: string;

    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    name: string;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    description: string;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    price: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    bodyType: BodyTypes;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    fuelType: FuelType;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    fuelCity: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    fuelTrack: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    enginePower: number;
    
    @IsOptional()
    engineVolume: number;
    
    @IsOptional()
    maxSpeed: number;
    
    @IsOptional()
    accelerationTime: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    kpp: KPP;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    gears: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    wheelDrive: WheelDrive;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    doors: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    sits: number;
    
    @IsOptional()
    airbags: number;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    AC: AC;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    steering: SteeringType;
    
    @IsDefined({
        message: 'Не заполнено поле $property'
    })
    trunkVolume: number;
    
    @IsOptional()
    createYear: number;
}