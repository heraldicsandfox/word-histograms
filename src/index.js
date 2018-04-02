import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';

import AdvancedApp from './AdvancedApp'
import BasicApp from './BasicApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <HashRouter>
        <div>
            <Route exact path="/" component={BasicApp} />
            <Route path="/basic" component={BasicApp} />
            <Route path="/advanced" component={AdvancedApp} />
        </div>
    </HashRouter>
  ), document.getElementById('root'));
registerServiceWorker();
