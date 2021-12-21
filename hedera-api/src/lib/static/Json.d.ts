export class Json extends UploadableFile {
    static isInfoAcceptable(jInfo: any): boolean;
    /**
     * @private
     */
    private static _guardForInvalid;
    constructor(jInfo: any);
    _info: any;
}
import { UploadableFile } from "../UploadableFile";
