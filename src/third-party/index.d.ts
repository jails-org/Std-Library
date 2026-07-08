/**
 * Gets an <script type="text/third-party" data-name="analytics"> element by name and
 * returns a Promise that will be resolved after script load and execute inline text script.
 * @usage
 * 		const analytics = thirdParty('analytics')
        analytics.then( _ => window.gtag('event', 'buy_click', {...})
 */
export declare const thirdParty: (name: string) => Promise<HTMLScriptElement>;
