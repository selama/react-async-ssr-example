import React from 'react';
import s from './App.scss';
import { Movie } from '../Movie';

interface AppProps {}

class App extends React.Component<AppProps> {
  render() {
    return (
      <div className={s.root}>
        <h2 className={s.title} data-hook="app-title">
          Playing now...
        </h2>
        <Movie />
      </div>
    );
  }
}

export default App;
