export interface Division {
  DivisionID: number;
  DivisionName: string;
  DivisionAccronym: string;
  DivisionAddress1: string;
  DivisionAddress2: string;
  DivisionCity: string;
  DivisionStateID: number;
  DivisionZip: string;
  DivisionCountryID: number;
  DivisionPhone: string;
  DivisionFax: string;
  DivisionEmail: string;
  DivisionURL: string;
  DunsID: string;
  OwnershipID: number;
  BusinessLicense: string;
  BusinessStatusID: number;
  YearFounded: number;
  TotalStaffNum: number;
  PreviousDivisionNames: string;
  PreviousDivision_YearFounded: string;
  PreviousDivision_DunsID: string;
  CreateDate: Date;
  ModifyDate: Date;
  DeleteRecord: boolean;
  Available: boolean;
  UserID: number;
  old_divisionid: string;
  divisionSalesGoal: number;
  MarginPercentage: number;
  AssessmentPercentage: number;
  ROW_VERSION: string;
}
