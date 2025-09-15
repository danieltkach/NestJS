import { MigrationInterface, QueryRunner } from 'typeorm';

export class TitleToName1757902894550 implements MigrationInterface {
  name = 'TitleToName1757902894550';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "title" character varying NOT NULL`,
    );
  }
}
