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

export class PurchaseTreeDto {
  @ApiProperty({ type: String, description: 'Tree Type Name', example: 'Cinar' })
  @IsString() typeName;

  @ApiProperty({ type: String, description: 'Region tree planted', example: 'Brazil' })
  @IsString() region;

  @ApiProperty({ type: String, description: 'Birthdate of tree (timestamp)', example: 1637121444507 })
  @IsNumber() birthDate;

  @ApiProperty({ type: String, description: 'Height of tree (mm)', example: 1000 })
  @IsNumber() height;

  @ApiProperty({ type: String, description: 'Diameter of tree (mm)', example: 20 })
  @IsNumber() diameter;
}

export class ApprovalDto {
  @ApiProperty({ type: String, description: 'Account address to approve its tree', example: '0x' })
  @IsString() from;

  @ApiProperty({ type: String, description: 'Account address to receive approval of tree', example: '0x' })
  @IsString() to;
}

export class TransferDto {
  @ApiProperty({ type: String, description: 'Account address to send its tree', example: '0x' })
  @IsString() from;

  @ApiProperty({ type: String, description: 'Account address to receive tree', example: '0x' })
  @IsString() to;

  @ApiProperty({ type: String, description: 'Tree Id', example: '0' })
  @IsString() treeId;
}