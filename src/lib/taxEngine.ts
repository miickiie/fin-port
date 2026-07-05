import { addYears, differenceInYears, format, parseISO, isAfter } from 'date-fns';
import { InvestmentLog } from '../types';

export function calculateTaxUnlockDate(
  log: InvestmentLog,
  dateOfBirth?: string
): { unlockDate: Date | null; message: string; messageKey: string; formattedDate?: string; canWithdraw: boolean } {
  if (!log.date) {
    return { unlockDate: null, message: 'ไม่ระบุวันที่ลงทุน', messageKey: 'noDateSpecified', canWithdraw: false };
  }

  const buyDate = parseISO(log.date);

  if (log.wrapperType === 'ThaiESG') {
    // ThaiESG: Buy date + 5 years (per user request)
    // (Note: Currently actually 8 years but following prompt rule "วันซื้อ + 5 ปี")
    const unlockDate = addYears(buyDate, 5);
    const now = new Date();
    const canWithdraw = isAfter(now, unlockDate);
    const formattedDate = format(unlockDate, 'dd/MM/yyyy');
    return {
      unlockDate,
      message: `ถอนได้: ${formattedDate}`,
      messageKey: 'canWithdraw',
      formattedDate,
      canWithdraw,
    };
  }

  if (log.wrapperType === 'RMF') {
    if (!dateOfBirth) {
      return {
        unlockDate: null,
        message: 'ต้องกรอกวันเกิด (ไปที่ Settings)',
        messageKey: 'mustEnterDob',
        canWithdraw: false,
      };
    }

    const dob = parseISO(dateOfBirth);
    const age55Date = addYears(dob, 55);
    const hold5YearsDate = addYears(buyDate, 5);

    // Max of (buy date + 5 years, 55th birthday)
    const unlockDate = isAfter(hold5YearsDate, age55Date) ? hold5YearsDate : age55Date;
    const now = new Date();
    const canWithdraw = isAfter(now, unlockDate);
    const formattedDate = format(unlockDate, 'dd/MM/yyyy');
    
    return {
      unlockDate,
      message: `ถอนได้: ${formattedDate}`,
      messageKey: 'canWithdraw',
      formattedDate,
      canWithdraw,
    };
  }

  return { unlockDate: null, message: 'ไม่มีเงื่อนไขล็อค', messageKey: 'noLockConditions', canWithdraw: true };
}
