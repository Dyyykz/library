import { loan as loanModel } from "@prisma/client";

export class LoanEntity implements loanModel {
   id: string;
   bookId: string;
   isReturned: boolean;
   loanDate: Date;
   returnDate: Date;
   userId: string;
}
