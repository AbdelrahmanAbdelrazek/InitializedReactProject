import React, {Component} from 'react'
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
import { mapStateToProps } from './mapping';

class Loading extends Component {
    render() {
        
        return (
            <div>
                {this.props.loading && 
                    <div className="loading">
                        <Loader 
                            type="Circles" 
                            color="#4F2280" 
                            height="100" 
                            width="100"/>
                    </div>
                }
            </div>
        );
    }

}
export default connect(mapStateToProps)(Loading)