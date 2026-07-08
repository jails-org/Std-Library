export declare const mfe: ({ timeout }?: {
    timeout?: number;
}) => {
    renderJS({ target, tag, src }: {
        target: any;
        tag: any;
        src: any;
    }): Promise<unknown>;
    render(target: any, uri: string): Promise<unknown>;
};
export declare const Shell: (config?: {}) => any;
