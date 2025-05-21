export declare const storage: {
    local: {
        set(name: string, data: any): any;
        get(name: string): string;
        remove(name: string): any;
    };
    session: {
        set(name: string, data: any): any;
        get(name: string): string;
        remove(name: string): any;
    };
};
