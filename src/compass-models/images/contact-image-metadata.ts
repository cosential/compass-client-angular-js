/**
 * Represents the image metadata for a Contact.
 * @example Read images metadata for a Contact
 * ```
 * client.get<ContactImageMetadata[]>('/contacts/5556666/images').then( (res) => {
 *      if(res.success){ //success
 *          res.result.forEach((index) => { console.log(index.ImageUrl); });
 *      } else { //something went wrong
 *          console.log(res.message);
 *      }
 * });
 * ```
 */
export interface ContactImageMetadata {
  Entity: string;
  ImageType: string;
  ImageUrl: string;
}