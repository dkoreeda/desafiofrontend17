import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import ShowAllVideos from './components/AllVideosPage';

export default (
  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/videos' component={ShowAllVideos} />
      <Route exact path='/destaque' component={Home} />
    </div>
  </BrowserRouter>
)
