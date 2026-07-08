export declare const isVisible: (target: HTMLElement, { root, rootMargin, threshold }?: Options) => Promise<unknown>;
type Options = {
    root?: HTMLElement;
    rootMargin?: string;
    threshold?: number;
};
export {};
