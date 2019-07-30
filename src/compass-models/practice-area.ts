/**
 * Represents the Practice Areas.
 * @example Read all Contact PracticeAreas
 * ```
 * client.get<PracticeArea[]>('/contacts/PracticeAreas').then( (res) => {
 *      if (res.success) { //returns an array of division elements
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 * @example Read a Contact's PracticeAreas
 * ```
 * client.get<PracticeArea[]>('/contacts/5555999/PracticeAreas').then( (res) => {
 *      if (res.success) {
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 * @example Add PracticeAreas to a contact's PracticeAreas
 * ```
 * // payload is an array of Division elements to be added
 * client.post<PracticeArea[]>('/contacts/5555999/PracticeAreas', payload).then( (res) => {
 *      if (res.success) {
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 * @example Read all Company PracticeAreas
 * ```
 * client.get<PracticeArea[]>('/companies/PracticeAreas').then( (res) => {
 *      if (res.success) { //returns an array of division elements
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 * @example Read a Company's PracticeAreas
 * ```
 * client.get<PracticeArea[]>('/companies/5555999/PracticeAreas').then( (res) => {
 *      if (res.success) {
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 * @example Add PracticeAreas to a Company's PracticeAreas
 * ```
 * // payload is an array of Division elements to be added
 * client.post<PracticeArea[]>('/companies/5555999/PracticeAreas', payload).then( (res) => {
 *      if (res.success) {
 *          res.result.forEach( (index) => { console.log(index.PracticeAreaId); } );
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 */
export interface PracticeArea {
  PracticeAreaId: number;
  PracticeAreaName: string;
  PracticeAreaAcronym: string;
  PracticeAreaAddress1: string;
  PracticeAreaAddress2: string;
  PracticeAreaCity: string;
  PracticeAreaStateID: number;
  PracticeAreaZip: string;
  PracticeAreaCountryID: number;
  PracticeAreaPhone: string;
  PracticeAreaFax: string;
  PracticeAreaEmail: string;
  PracticeAreaUrl: string;
  CreateDate: Date;
  ModifyDate: Date;
  DeleteRecord: boolean;
  Available: boolean;
  UserID: number;
  old_practiceareaid: string;
  practiceareaSalesGoal: number;
  MarginPercentage: number;
  AssessmentPercentage: number;
  ROW_VERSION: string;
}
