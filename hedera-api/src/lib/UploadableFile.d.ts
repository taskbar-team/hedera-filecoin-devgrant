export class UploadableFile {
    /**
     * Uploads this Uploadable to the desired client passing in arguments if provided.
     *
     * @param {Array} args - A list of arguments to use and/or pass along. If the first object contains a '_file' property, it's assumed that its content contains
     *                       FileCreateTransaction constructor arguments and is embedded in the transaction being created. It then goes on to discard that initial
     *                       value before passing the remaining arguments along to the _onFileUploaded implementation.
     * @public
     */
    public uploadTo({ client, args }: any[]): Promise<any>;
    /**
     * @protected
     */
    protected _onFileUploaded({ client, receipt, args }: {
        client: any;
        receipt: any;
        args?: any[] | undefined;
    }): Promise<any>;
    /**
     * @abstract
     * @protected
     * @returns {Uint8Array | string}
     */
    protected _getContent(): Uint8Array | string;
    /**
     * @private
     */
    private _getFileTransactionsFor;
}
