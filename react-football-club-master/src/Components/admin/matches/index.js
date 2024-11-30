import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class AdminMatches extends Component {
  state = {
    matches: [], // Stocke les matchs
  };

  componentDidMount() {
    // Charger les données des matchs depuis Firebase
    firebaseMatches.once('value').then((snapshot) => {
      const matches = firebaseLooper(snapshot); // Transforme les données en tableau
      this.setState({
        matches: reverseArray(matches), // Trie les matchs dans l'ordre inverse
      });
    });
  }

  render() {
    return (
      <AdminLayout>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Match</TableCell>
                <TableCell>Result</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>{match.date}</TableCell>
                  <TableCell>
                    {match.teamA} vs {match.teamB}
                  </TableCell>
                  <TableCell>
                    {match.resultA} - {match.resultB}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin_matches/edit/${match.id}`}>Edit</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </AdminLayout>
    );
  }
}

export default AdminMatches;
