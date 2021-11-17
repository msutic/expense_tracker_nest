import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/users/user.model';
import { IncomeGroup } from 'src/incomeGroups/incomeGroup.model';

export type IncomeDocument = Income & mongoose.Document;

@Schema({ timestamps: true })
export class Income {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'IncomeGroup' })
  incomeGroup: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const IncomeSchema = SchemaFactory.createForClass(Income);
