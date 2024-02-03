import {useRef, useEffect} from 'react';
import * as React from 'react';
import warning from "./utils/warning";
import {classList} from "./utils/util";
import DomNode from "./DomNode";

interface FocusWithinProps {
    children: React.ReactElement,
    focusClassName?: string
    disabled?: boolean
}

const noop: () => void = () => undefined;

const {stopPropagation} = FocusEvent.prototype

type FocusNode = HTMLElement & { __onFocus: () => void, __onBlur: () => void }

FocusEvent.prototype.stopPropagation = function (...rest) {
    const path = ((this as unknown as { path: FocusNode[] }).path || this.composedPath()) as FocusNode[];
    path.forEach((node) => {
        if (['blur', "focusout"].includes(this.type)) {
            node.__onBlur && node.__onBlur();
        } else if (['focus', "focusin"].includes(this.type)) {
            node.__onFocus && node.__onFocus();
        }
    })
    return stopPropagation.call(this, ...rest)
}

/***
 * 该组件的功能是类似于css伪类:focus-within
 * 即当前组件包裹的children的子组件获得焦点、那么当前组件包裹的children就会添加is-focus类
 */
const FocusWithin: React.FC<FocusWithinProps> = (props) => {

    const {
        children,
        disabled,
        focusClassName = 'is-focus',
    } = props;

    const ref = useRef<FocusNode>(null)

    useEffect(() => {
        const keys = Object.keys(props)
            .filter(key => key !== 'children' && key !== 'disabled' && key !== 'focusClassName')
            .map(key => key + '属性无效，');
        warning(
            keys.length === 0,
            'FocusWithin',
            keys + 'FocusWithin组件只支持children、disabled、focusClassName属性'
        );

        if (ref.current) {
            const __onFocus = ref.current.__onFocus || noop;
            ref.current.__onFocus = () => {
                handleFocus();
                return __onFocus()
            }
            const __onBlur = ref.current.__onBlur || noop;
            ref.current.__onBlur = () => {
                handleBlur();
                return __onBlur()
            }
        }
    }, [])

    /**
     * 处理聚焦
     */
    const handleFocus: () => void = () => {
        if (!disabled) {
            const classes = classList(ref.current as HTMLElement)
            if (!classes.contains(focusClassName)) {
                classes.add(focusClassName)
            }
        }
    }

    /**
     * 处理失去焦点
     */
    const handleBlur = () => {
        if (!disabled) {
            const classes = classList(ref.current as HTMLElement)
            if (classes.contains(focusClassName)) {
                classes.remove(focusClassName)
            }
        }
    }

    return (
        <DomNode
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {children}
        </DomNode>
    )
}

export default FocusWithin
