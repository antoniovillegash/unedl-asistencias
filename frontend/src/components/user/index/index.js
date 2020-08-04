import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import CreateAttendance from '../attendance/createAttendance';
import PrivateRoutingUser from '../auth/privateRouting';

export default class index extends Component {
    render() {
        return (
            <Router>
            <PrivateRoutingUser path="/" exact component={CreateAttendance} />
      
    </Router>


        )
    }
}
