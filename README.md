📦 **Description**

The 'DomNode' Component is like React.Fragment and you can add React composite events and you can get a DOM reference by ref

📦 **Installation**
``` javascript
npm install @ts-pan/dom-node
```
🔨 **Usage**
``` javascript
/**OutSide Demo1**/
import {OutSide} from '@ts-pan/dom-node';
function MyComponent() {
  return (
    <OutSide
      onOutSideClick={() => {
        alert('You clicked outside of this component!!!');
      }}
    >
       <span>Hello World</span>
    </OutSide>
  );
}

/**OutSide Demo2**/
import {FocusWithin} from '@ts-pan/dom-node';
/**
 * FocusWithin  It's very similar to the Pseudo class :focus-within
 *
 * when you focus the input you will find the div will add class ‘is-focus’
 *and then when you blur you will find the div will remove class ‘is-focus’
 **/
function MyComponent2() {

  return (
    <FocusWithin>
       <div><input/></div>
    </FocusWithin>
  );
}

/**DomNode Demo3**/
import {DomNode} from '@ts-pan/dom-node';
/**
 * The function of the DomNode is to render not only children, but also click events in the proxy children
 * It is equivalent to rendering < div > {children} < / div > but deleting the div after the first rendering
 **/
function MyComponent3() {

  return (
    <DomNode
      ref={(ref)=>{
        console.log('You will get the divs ref !!!');
      }}
      onClick={(e)=>{
         console.log('any event you can add to DomNode ');
      }}
    >
       <div>123</div>
    </DomNode>
  );
}

```
🖥 ****API****

**FocusWithin**
``` javascript
interface FocusWithinProps {
    children: React.ReactElement;
    focusClassName?: string;
    disabled?: boolean;
}
export default class FocusWithin extends React.PureComponent<FocusWithinProps> {
    static defaultProps: {
        focusClassName: string;
    };
    render(): React.ReactNode;
}
```
 **DomNode**
``` javascript
type DomNodeProps = React.DOMAttributes<unknown>
```
 **FocusWithin**
``` javascript
interface OutSideProps {
    children?: JSX.Element;
    onOutSideClick?: (e: React.MouseEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    triggerTiming?: 'inner' | 'outside';
    once: boolean;
}
export default class OutSide extends React.Component<OutSideProps> {
    static defaultProps: {
        triggerTiming: string;
        once: boolean;
    };
    render(): React.ReactNode;
}
```
