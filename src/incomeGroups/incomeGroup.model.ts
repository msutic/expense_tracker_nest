import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IncomegroupDocument = IncomeGroup & Document;

@Schema({ timestamps: true })
export class IncomeGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  isDefault: boolean;

  //   @Prop()
  //   user: string;
}

export const IncomeGroupSchema = SchemaFactory.createForClass(IncomeGroup);
