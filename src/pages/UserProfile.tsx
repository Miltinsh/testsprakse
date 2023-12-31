import React from 'react';
import { useLocation } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, useIonViewWillEnter } from '@ionic/react';
import { getUserData } from '../services/database.service';


const UserProfile: React.FC = () => {

  type User = {
    ID: number;
    Name: string;
    Surname: string;
    Email: string;
    Pass: string;
    // other fields...
  };

  const location = useLocation<{ user: User }>();
  const user = location.state.user;
 
  useIonViewWillEnter(() => {
    getUserData(user.Email);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
        <h2>Welcome to {user.Name}'s Profile</h2>
        <p>Email: {user.Email}</p>
        {/* Display other user properties here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;