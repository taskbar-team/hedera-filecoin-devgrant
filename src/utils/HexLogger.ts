class HexLogger {
    private module: string | null = null;
    private isDebugging: boolean = false;

    constructor(_module?: string) {
        if (_module)
            this.module = _module;
    }

    enableDebugging(_value: boolean): void {
        this.isDebugging = _value
    }

    setModule(_module: string) {
        this.module = _module
    }

    log(..._args: any): void {
        this.isDebugging && console.log(`[${this.module}]: `, _args)
    }

    logError(..._args: any): void {
        this.isDebugging && console.error(`[${this.module}]: `, _args)
    }

}

export default HexLogger