import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LogInDto } from './dto/logIn.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() body: LogInDto) {
    const authentication = await this.authenticationService.login(body);
    return authentication;
  }
}
