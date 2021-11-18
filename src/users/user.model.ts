import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next: Function) {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, 10);

  user.password = hashedPassword;

  next();
});

UserSchema.methods.comparePassword = async function comparePasswords<User>(
  submittedPassword: string,
) {
  const isValid = await bcrypt.compare(submittedPassword, this.password);
  return isValid;
};
