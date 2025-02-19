import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard, RolesGuard } from '@app/common/guards';
import { AlwaysArrayPipe } from '@app/common/pipes';

import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '../../users/enums/user-role.enum';
import { CreateVariableDto } from '../dto/create-variable.dto';
import { UpdateVariableDto } from '../dto/update-variable.dto';
import { VariableResponseDto } from '../dto/variable-response.dto';
import { VariablesService } from '../variables.service';

@ApiBearerAuth()
@ApiTags('Variables')
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.Moderator, UserRole.Administrator, UserRole.APIService)
@Controller('/variables')
export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {}

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.CREATED })
  @Post()
  create(@Body() payload: CreateVariableDto) {
    return this.variablesService.create(payload);
  }

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.CREATED, isArray: true })
  @ApiBody({ type: CreateVariableDto, isArray: true })
  @Post('/many')
  createMany(@Body() payloads: CreateVariableDto[]) {
    return this.variablesService.createMany(payloads);
  }

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.OK, isArray: true })
  @ApiQuery({ name: 'keys', type: String, isArray: true, required: false })
  @Get()
  findAll(@Query('keys', AlwaysArrayPipe) keys: string[]) {
    return this.variablesService.findAll(keys);
  }

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.OK })
  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.variablesService.findOne(key);
  }

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.OK })
  @Patch()
  update(@Body() payload: UpdateVariableDto) {
    return this.variablesService.update(payload);
  }

  @ApiResponse({ type: VariableResponseDto, status: HttpStatus.OK })
  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.variablesService.remove(key);
  }
}
