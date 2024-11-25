import { Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('fix-problems')
  async fixProblems(): Promise<{ updatedCount: number }> {
    const updatedCount = await this.userService.updateProblemsFlag();
    return { updatedCount };
  }
}

/*import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}*/
