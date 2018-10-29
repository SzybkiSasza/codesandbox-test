import 'jsdom-global/register';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// Fetch automock
(global as any).fetch = require('jest-fetch-mock');
