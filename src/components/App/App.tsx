import React from 'react';
import s from './App.scss';

interface AppProps {}

class App extends React.Component<AppProps> {


  render() {
    return (
      <div className={s.root}>
        <h2 className={s.title} data-hook="app-title">
          SSR App
        </h2>


      </div>
    );
  }
}

export default App;
