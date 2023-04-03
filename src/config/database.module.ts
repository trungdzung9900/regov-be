import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('MONGO_PATH'));
        console.log(configService.get('MONGO_USERNAME'));
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const path = configService.get('MONGO_PATH');
        return {
          uri: `mongodb://${username}:${password}@${path}`,
          dbName: database,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
