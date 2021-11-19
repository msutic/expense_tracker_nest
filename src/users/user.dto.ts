export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class LoginUserDto {
  username: string;
  password: string;
}
