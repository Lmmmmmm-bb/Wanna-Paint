import './index.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import Paint from '../pages/Paint';
import Tutorial from '../pages/Tutorial';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Paint} />
        <Route exact path='/tutorials' component={Tutorial} />
        <Redirect to='/' />
      </Switch>
    </div>
  );
}

export default App;
