export class CreateIncomeDto {
  name: string;
  description: string;
  user: string;
  incomeGroup: string;
}

export class UpdateIncomeDto {
  name: string;
  description: string;
}
