import * as React from 'react';

interface DomNodeProps extends React.DOMAttributes<unknown> {
    /**@default div*/
    is?: string
}

function assignment(node: HTMLDivElement | null, ref: React.ForwardedRef<Element | null | Text>) {
    const content = (node?.firstChild || null) as (Element | Text | null)
    typeof ref === 'function' ? ref(content) : ref && (ref.current = content);
}

/**
 * 获取真实dom
 */
const DomNodeRender: React.ForwardRefRenderFunction<Element | null | Text, DomNodeProps> = (props, ref) => {
    const contentsRef = React.useRef<HTMLDivElement | null>();

    React.useLayoutEffect(() => {
        const ob = new MutationObserver(() => {
            assignment(contentsRef.current!, ref);
        })
        ob.observe(contentsRef.current!, {childList: true, subtree: false, attributes: false})
        return () => {
            ob.disconnect();
        }
    }, [ref])
    const {is = 'div', children, ...rest} = props;

    return React.createElement(is,
        {
            ref: (node: HTMLDivElement | null) => {
                assignment(node, ref);
                contentsRef.current = node;
            },
            ...rest,
            style: {
                display: 'contents'
            },
        },
        children)
}
const DomNode = React.forwardRef(DomNodeRender)

DomNode.displayName = 'DomNode';
export default DomNode;
