import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/user.model';

export type IncomegroupDocument = IncomeGroup & mongoose.Document;

@Schema({ timestamps: true })
export class IncomeGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  isDefault: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const IncomeGroupSchema = SchemaFactory.createForClass(IncomeGroup);
