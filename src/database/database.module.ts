import { Module } from '@nestjs/common';
import { InitDb } from './init-db.provider';

@Module({

    providers: [InitDb]
})
export class DatabaseModule { }

