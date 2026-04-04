import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [TypeOrmModule.forRoot({
      type:'mysql',
      host:'127.0.0.1',
      port:3306,
      username:'root',
      password:'Saurabhmaiti@5934',
      database:'Food_Delivery_Backend',
      entities:[User],
      synchronize:true,
    }), AuthModule, UserModule, MailModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
