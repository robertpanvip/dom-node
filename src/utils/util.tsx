/**
 * 只执行一次fn
 * @param fn
 * @param context
 */
export function once<T extends (...args: Parameters<T>) => unknown>(fn: T, context?: unknown): (...args: Parameters<T>) => ReturnType<T> {
    let result: ReturnType<T>;
    let call: T | null = fn;
    return function (...params) {
        if (call) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result = call.apply(context || this, params);
            call = null;
        }

        return result;
    };
}

/**
 * 类似于dom的classList
 */
export function classList(dom: Element): Pick<DOMTokenList, 'add' | 'remove' | 'toggle' | 'contains'> {
    const _dom = dom;
    let classes: Array<string> = dom?.className?.trim().split(/\s+/g) || [];
    return {
        add(...params: string[]): void {
            (classes as Array<string | string[]>).push(params);
            classes = classes.flat();
            _dom && (_dom.className = classes.join(' ').trim());
        },
        remove(...params: string[]): void {
            params.forEach((param = '') => {
                const index = classes.indexOf(param);
                if (index !== -1) {
                    classes.splice(index, 1)
                }
            });
            if (_dom && classes.length === 0) {
                return _dom.removeAttribute('class');
            }
            _dom && (_dom.className = classes.join(' ').trim());
        },
        toggle(token: string, force?: boolean): boolean {
            const index = classes.indexOf(token);
            if (index === -1) {
                classes.push(token);
            } else if (!force) {
                classes.splice(index, 1)
            }
            if (_dom && classes.length === 0) {
                _dom.removeAttribute('class');
                return true
            }
            _dom && (_dom.className = classes.join(' ').trim());
            return true;
        },
        contains(token: string): boolean {
            return !!classes.find(item => token === item)
        }
    }

}
