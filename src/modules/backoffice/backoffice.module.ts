import { AccountController } from './controllers/account.controller';
import { PetController } from './controllers/pet.controller';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { CustomerService } from './services/customer.service';
import { AccountService } from './services/account.service';
import { UserSchema } from './schemas/user.schema';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerController } from './controllers/customer.controller';
import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetService } from './services/pet.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { AuthService } from 'src/shared/services/auth.service';

@Module({
    imports: [
        HttpModule,
        CacheModule.register(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secretOrPrivateKey: 'secretKey',
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([
        {
            name: 'Customer',
            schema: CustomerSchema,
        },
        {
            name: 'User',
            schema: UserSchema,
        },
    ])],
    controllers: [AccountController, CustomerController, AddressController, PetController],
    providers: [AccountService, AddressService, PetService, CustomerService, AuthService, JwtStrategy],
})
export class BackofficeModule {}
