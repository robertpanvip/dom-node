export default class EventTarget<E extends Event> {

    private readonly listeners: Record<string | symbol, ((e: E) => void)[]>;

    /**
     * 构造函数
     */
    constructor() {
        this.listeners = {};
    }

    /**
     *添加监听
     * @param type
     * @param callback
     */
    addEventListener(type: string | symbol, callback: (event: E) => void): void {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }

    /**
     *移除监听
     * @param type
     * @param callback
     */
    removeEventListener(type: string | symbol, callback: (event: E) => void): void {
        if (!(type in this.listeners)) {
            return;
        }
        const stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return this.removeEventListener(type, callback);
            }
        }
    }

    /**
     *触发监听
     * @param type
     * @param params
     */
    dispatchEvent(type: string | symbol, params?: E): void {
        if (!(type in this.listeners)) {
            return;
        }
        const stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            stack[i].call(this, params!);
        }
    }
}


