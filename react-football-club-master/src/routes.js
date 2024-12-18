import React from 'react';
import Layout from './Hoc/Layout';
import { Switch, Route } from 'react-router-dom';

import PrivateRoutes from './Components/authRoutes/privateRoutes';
import PublicRoutes from './Components/authRoutes/publicRoutes';

import Home from './Components/home';
import SignIn from './Components/signin';
import EditMatch from './Components/admin/matches/EditMatch'; // Chemin vers le fichier EditMatch
import AdminPlayers from './Components/admin/players/AdminPlayers';
import TeamDetails from './Components/team/TeamDetails'; // Chemin relatif au fichier
import PlayerDetail from './Components/team/players/PlayerDetail'

 
import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/matches';
import TeamPage from './Components/team'; // Importez la page d'équipe
import MatchesPage from "./Components/matches";

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <PublicRoutes {...props} restricted={false} path="/admin" exact component={Dashboard} />
        <PublicRoutes {...props} path="/admin_matches/edit_match" exact component={EditMatch} />
        <Route path="/team" exact component={TeamPage} />
        <Route path="/team/:id" component={TeamDetails} />
        <Route path="/player/:playerId" component={PlayerDetail} />
        <Route path="/matches" element={<MatchesPage />} /> 
        <Route path="/" exact component={Home} />




        <PublicRoutes {...props} restricted={false} path="/admin_matches" exact component={AdminMatches} />

        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
        {/* Ajoutez la route pour /the_team */}
        <PublicRoutes {...props} restricted={false} path="/the_team" exact component={TeamPage}/>
      </Switch>
    </Layout>
  );
};

export default Routes;

