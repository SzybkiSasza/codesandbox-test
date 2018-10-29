import * as React from 'react';
import { render } from 'react-dom';

import { Pager } from './components/Pager/Pager';

import './index.css';

export const App = () => (
  <div className="app">
    <Pager itemsPerPage={3} />
  </div>
);

render(<App />, document.getElementById('root'));
