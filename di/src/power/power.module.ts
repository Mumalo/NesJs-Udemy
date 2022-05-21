import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], //accessible only inside the module. Denotes classes and their dependencies
  exports: [PowerService] //make this available to other modules
})
export class PowerModule {}
