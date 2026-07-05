export default {
  // Navigation
  dashboard: 'ภาพรวม',
  addLog: 'บันทึกรายการ',
  history: 'ประวัติ',
  targets: 'เป้าหมาย',
  settings: 'ตั้งค่า',
  
  // Dashboard
  portfolioOverview: 'ภาพรวมพอร์ตการลงทุน',
  portfolioOverviewDesc: 'ตัวติดตามการลงทุนส่วนบุคคลของคุณ',
  totalTarget: 'เป้าหมายรวม',
  totalInvested: 'เงินลงทุนทั้งหมด (ต้นทุน)',
  remainingToInvest: 'ยอดคงเหลือให้ลงทุนตามแผน',
  currentAllocation: 'สัดส่วนปัจจุบัน',
  noInvestmentsYet: 'ยังไม่มีการลงทุน',
  targetProgress: 'ความคืบหน้าตามเป้าหมาย',
  upcomingTaxUnlocks: 'กำหนดปลดล็อคภาษี',
  noPendingTaxLocks: 'ไม่มีเงื่อนไขปลดล็อคภาษี',
  
  // Log Form
  addInvestmentLog: 'บันทึกการลงทุน',
  addInvestmentLogDesc: 'บันทึกการซื้อหรืออัปเดตข้อมูล',
  date: 'วันที่',
  fundAssetName: 'ชื่อกองทุน / สินทรัพย์',
  targetCategory: 'หมวดเป้าหมาย',
  wrapperType: 'ประเภทบัญชี',
  investedAmount: 'จำนวนเงินลงทุน (ต้นทุน)',
  currentValueOptional: 'มูลค่าปัจจุบัน (ทางเลือก)',
  leaveBlankToUseCost: 'เว้นว่างไว้เพื่อใช้ราคาต้นทุน',
  notesOptional: 'บันทึกเพิ่มเติม (ทางเลือก)',
  additionalDetails: 'รายละเอียดเพิ่มเติม...',
  saveInvestmentLog: 'บันทึกข้อมูล',
  
  // History
  historyHoldings: 'ประวัติและสินทรัพย์',
  historyHoldingsDesc: 'ดูและจัดการบันทึกการลงทุนของคุณ',
  noInvestmentLogsFound: 'ไม่พบบันทึกการลงทุน',
  investedCost: 'เงินลงทุน (ต้นทุน)',
  currentValue: 'มูลค่าปัจจุบัน',
  confirmRevertLog: 'คุณแน่ใจหรือไม่ว่าต้องการย้อนกลับ (ลบ) รายการนี้?',
  locked: '🔒 ',
  unlocked: '✅ ',
  
  // Targets
  targetAllocation: 'สัดส่วนเป้าหมาย',
  targetAllocationDesc: 'แก้ไขเป้าหมายการลงทุนเริ่มต้นของคุณ',
  totalPlannedPortfolioSize: 'ขนาดพอร์ตการลงทุนตามแผนรวม',
  saveTargets: 'บันทึกเป้าหมาย',
  targetsUpdatedSuccessfully: 'อัปเดตเป้าหมายเรียบร้อยแล้ว',
  
  // Settings
  configurePreferences: 'กำหนดค่าการติดตามของคุณ',
  personalDetails: 'ข้อมูลส่วนตัว',
  dateOfBirth: 'วันเกิด',
  dobRequiredForRmf: 'จำเป็นสำหรับการคำนวณวันปลดล็อคภาษี RMF ที่แม่นยำ (เงื่อนไขอายุ 55 ปี)',
  appearance: 'การแสดงผล',
  theme: 'ธีม',
  light: 'สว่าง',
  dark: 'มืด',
  systemDefault: 'ตามระบบ',
  language: 'ภาษา',
  english: 'English',
  thai: 'ภาษาไทย',
  backupSync: 'สำรองข้อมูลและซิงค์',
  gasWebhookUrl: 'URL เว็บฮุค Google Apps Script',
  gasWebhookUrlDesc: 'สร้างสคริปต์ GAS ที่รับข้อมูล POST และเขียนลง Google Sheet/Drive จากนั้นวาง URL ที่นี่เพื่อเปิดใช้งานการซิงค์',
  syncToGoogleDrive: 'ซิงค์ไปยัง Google Drive',
  exportJsonBackup: 'ส่งออกข้อมูลสำรอง JSON',
  syncing: 'กำลังซิงค์...',
  syncComplete: 'ซิงค์ข้อมูลสำเร็จ!',
  syncFailed: 'ซิงค์ล้มเหลว โปรดตรวจสอบ URL และการตั้งค่า CORS ในเว็บแอป GAS ของคุณ',
  configureGasFirst: 'โปรดกำหนดค่า URL เว็บแอป Google Apps Script ก่อน',
  
  // Tax Engine
  noDateSpecified: 'ไม่ระบุวันที่ลงทุน',
  canWithdraw: 'ถอนได้:',
  mustEnterDob: 'ต้องกรอกวันเกิด (ไปที่ Settings)',
  noLockConditions: 'ไม่มีเงื่อนไขล็อค',
  
  // Categories
  RMF_FOREIGN_EQUITY: 'RMF หุ้นต่างประเทศ',
  GLOBAL_EQUITY: 'กองทุนหุ้นโลกปกติ',
  THAI_ESG_EQUITY: 'ThaiESG หุ้นไทย',
  THAI_ESG_FIXED_INCOME: 'ThaiESG ตราสารหนี้/ผสม',
  GOLD: 'ทองคำ',
  CASH: 'เงินฝากดอกเบี้ยสูง/เงินสด',
};
