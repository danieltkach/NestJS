import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1757901705861 } from 'src/migrations/1757901705861-CoffeeRefactor';
import { SchemaSync1757902698123 } from 'src/migrations/1757902698123-SchemaSync';
import { TitleToName1757902894550 } from 'src/migrations/1757902894550-TitleToName';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [
    CoffeeRefactor1757901705861,
    SchemaSync1757902698123,
    TitleToName1757902894550,
  ],
});
