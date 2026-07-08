export declare const Channel: ({ target, accept, origin }: {
    target?: any;
    accept?: any;
    origin?: string;
}) => {
    on(name: any, callback: any): void;
    emit(event: any, ...payload: any[]): void;
    remove(name: any): void;
};
