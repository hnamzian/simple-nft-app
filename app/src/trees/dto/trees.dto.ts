import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddTreeTypeDto {
  @ApiProperty({ type: String, description: 'Tree Type Name', example: 'Cinar' })
  @IsString() name: string

  @ApiProperty({ type: String, description: 'Oxygen Radiation Rate', example: 10 })
  @IsNumber() O2Rate: number

  @ApiProperty({ type: String, description: 'Tree Type Price', example: 10000000000000000 })
  @IsNumber() price: number
}

export class GetTreeTypeDto {
  @ApiProperty({ type: String, description: 'Tree Type Name', example: 'Cinar' })
  @IsString() treeTypeName: string
}

export class RemoveTreeTypeDto {
  @ApiProperty({ type: String, description: 'Tree Type Name', example: 'Cinar' })
  @IsString() treeTypeName: string
}