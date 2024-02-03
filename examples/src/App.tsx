import * as React from 'react';
import {OutSide, FocusWithin, DomNode} from "../../src";

function Change() {
    const [jsx, setJsx] = React.useState<React.ReactNode>(<div>123</div>)
    React.useEffect(() => {
        setTimeout(() => {
            setJsx(<div onClick={(e) => e.stopPropagation()}>xxx</div>)
        }, 2000)
    }, [])
    return jsx
}

class Test extends React.PureComponent {

    state = {};
    ref = React.createRef<HTMLDivElement>();

    /**
     *
     */
    componentDidMount() {
        console.log(this.ref);
    }

    /**
     *
     */
    render() {
        return (
            <div style={{margin: 50}}>
                <DomNode
                    ref={(ref) => {
                        console.log('You will get the divs ref !!!', ref);
                    }}
                    onClick={() => {
                        console.log('any event you can add to handler ');
                    }}
                >
                    <Change/>
                </DomNode>
                <FocusWithin focusClassName='xx'>
                    <div className="form-control" onFocus={(e) => e.stopPropagation()}>
                        <input
                            onFocus={(e) => e.stopPropagation()}
                            onBlur={(e) => e.stopPropagation()}
                        />
                    </div>
                </FocusWithin>
                <OutSide
                    ref={this.ref}
                    onOutSideClick={() => {
                        alert('You clicked outside of this component!!!');
                    }}
                >
                    <div style={{border: '1px solid', width: 200, height: 200}}/>
                </OutSide>
            </div>
        );
    }
}

/***
 *
 * @constructor
 */
export default function App(): React.ReactElement<HTMLElement> {
    return (
        <div className="app">
            <Test/>
        </div>
    )
}
