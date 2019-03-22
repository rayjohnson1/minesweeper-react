import React from 'react';
import { number } from 'prop-types';


interface IProps {
    time: number;
    //isOn: boolean;
}

export default class Timer extends React.Component<IProps> {

    private timer: any;

    constructor(props: IProps){
        super(props)
        
    }

    

    render() {

        return(
            <div>
                {/* <h3>timer: {ms(this.state.time)}</h3> */}
                <h3>timer: {(this.props.time)}</h3>
            </div>
        )
    }
}