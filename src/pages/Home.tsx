import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonInput, IonItem, IonList, IonButton} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const logOut = function(){
    window.location.href = '/LogIn';
}


const Home: React.FC = () => {   
    
    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                <IonRow>
                    <IonTitle>Home</IonTitle>
                    <IonButton style={{float: "right"}} onClick={logOut} shape="round">Sign Out</IonButton>
                </IonRow>
            </IonToolbar>
          </IonHeader>

          <IonContent fullscreen>
    
          </IonContent>
        </IonPage>
      );
};

export default Home;