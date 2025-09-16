import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection } from 'typeorm';
import coffeesConfig from 'src/config/coffees.config';

// class DevelopmentConfigService {}
// class ProductionConfigService {}

@Injectable()
class CoffeeBrandsFactory {
  /* do something... */
  create() {
    return ['buddy brew', 'nescafe'];
  }
}

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
    {
      provide: COFFEE_BRANDS,
      // useFactory: (brandsFactory: CoffeeBrandsFactory) =>
      //   brandsFactory.create(),
      useFactory: async (connection: Connection): Promise<string[]> => {
        // const coffeeBrands = await connection.query('SELECT * ...');
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        return coffeeBrands;
      },
      inject: [CoffeeBrandsFactory],
    },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
