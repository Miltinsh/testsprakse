import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { initializeDatabase } from './services/database.service';

setupIonicReact();
initializeDatabase()
const App: React.FC = () => {
  // This is a placeholder. You'd get the real authentication state from your state management logic.
  const isAuthenticated = false; // Or true based on your logic

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/LogIn">
            <LogIn/>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/UserProfile">
             <UserProfile />
          </Route>
          <Route exact path="/">
            <Redirect to="/LogIn" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
