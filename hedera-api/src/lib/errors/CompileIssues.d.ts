export class CompileIssues extends Error {
    static tryThrowingIfErrorsIn({ compileResult, ignoreWarnings }: {
        compileResult?: any;
        ignoreWarnings?: boolean | undefined;
    }): void;
    static _listOfSimpleIssueMessagesFor(rawIssues: any): any;
    /**
     * @private
     */
    private constructor();
    _issues: any;
    get issues(): any;
}
