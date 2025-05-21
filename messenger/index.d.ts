export declare const messenger: ({ target, accept, actions, origin }?: {
    target?: any;
    accept?: any;
    actions?: any;
    origin?: string;
}) => {
    dispatch(action: string, payload?: any): void;
    subscribe(actions_: any): void;
};
