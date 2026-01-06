import logo from './assets/logo.svg';
import appname from './assets/appname.svg';
import './App.css';
import { AddWeightForm } from './components/AddWeightForm';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={logo} className="logo" alt="App logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={appname} className="logo" alt="App name" />
        </a>
      </div>
      <div className="card">
        <h2 className="main-text">
          Your personal nutrition coaching companion for tracking progress, building custom meal
          plans, and achieving lasting weight loss results.
        </h2>

        <AddWeightForm />
      </div>
    </>
  );
}

export default App;
