import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SummonerProfile from './pages/summonerProfile';
import AiBP from './pages/aiBP.js'
import Data from './pages/data.js';
import ErrorPage from './pages/ErrorPage.js';
import Community_home from './pages/communities/community_home.js';
import Community_technical from './pages/communities/community_technical.js'
import Community_findTeamMate from './pages/communities/community_findTeamMate.js'
import Community_sign_up from './pages/communities/community_sign_up.js'
import Community_sign_in from './pages/communities/Community_sign_in.js'
import CrappyTeammates from './pages/communities/community_crappyTeammates.js'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/aiBP",
    element:<AiBP />
  },
  {
    path:'/summonerProfile',
    element:<SummonerProfile/>,
  },
  {
    path:"/data",
    element:<Data/>,
  },
  {
    path:'/SearchError',
    element:<ErrorPage />,
  },
  {
    path:'/community',
    element:<Community_home />
  },
  {
    path:'/community/technical',
    element:<Community_technical />
  },
  {
    path:'/community/findTeamMate',
    element:<Community_findTeamMate />
  },
  {
    path:'/community/signup',
    element:<Community_sign_up />
  },
  {
    path:'/community/signin',
    element:<Community_sign_in />
  },
  {
    path:'community/crappyteammates',
    element:<CrappyTeammates />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

