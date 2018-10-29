import * as React from 'react';
import { render } from 'react-dom';

import { Pager } from './components/Pager/Pager';

import './index.css';

const App = () => (
  <Pager itemsPerPage={3} />
);

render(<App />, document.getElementById('root'));
