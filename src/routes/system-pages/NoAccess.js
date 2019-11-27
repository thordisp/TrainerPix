import React from 'react';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import './SystemPages.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#002f6c',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#eeffff',
      main: '#bbdefb',
      dark: '#8aacc8',
      contrastText: '#000000',
    },
  },
});

export default function NoAccess() {
  return (
    <ThemeProvider theme={theme}>
      <div className="system-page">
        <div className="system-page__row">
          <div className="system-page__col">
            <h2 className="system-page__heading">Computer says no - Þú hefur ekki aðgang</h2>
            <div className="hrefButton">
              <Button variant="contained" color="secondary" href="/login">
                Innskráning
              </Button>
            </div>
            <div className="hrefButton">
              <Button variant="contained" color="secondary" href="/">
                Aftur á Forsíðu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
