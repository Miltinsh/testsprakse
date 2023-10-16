import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonInput, IonItem, IonList, IonButton, IonModal} from '@ionic/react';
import { OverlayEventDetail } from '@ionic/core/components';
import './LogIn.css';



const logUsing3rd = function(platform:string){
  switch(platform){
    case "google":
      window.location.href = 'https://www.google.com/';
      break;
    case "twitter":
      window.location.href = 'https://twitter.com/';
      break;
    case "facebook":
      window.location.href = 'https://www.facebook.com/';
      break;
    case "apple":
      window.location.href = 'https://www.apple.com/';
      break;
  }
}
  

  const logIn = function() {
    window.location.href = '/home';
  }

const Home: React.FC = () => {
  const [showPassModal, setShowPassModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  return (
    <IonPage>LogIn
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

          {/* Forgot pass modal */}
         <IonModal backdrop-dismiss="false" id='passMod' isOpen={showPassModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Forgot Password</IonTitle>
              <IonButton slot="end" onClick={() => setShowPassModal(false)}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">

            {/* Content for forgot password */}
            <p className="ion-text-left" style={{color: "white"}}>Provide your email to reset your password:</p>
            <IonInput className="ion-text-left" style={{color: "white"}} type="email" placeholder="email@domain.com"></IonInput>

            <IonButton expand="block" onClick={() => {
              //Reset
              setShowPassModal(false);

            }}>Reset Password</IonButton>
          </IonContent>
        </IonModal>

          {/* Sign Up modal */}
        <IonModal backdrop-dismiss="false" id='signMod' isOpen={showSignModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Sign Up</IonTitle>
              <IonButton slot="end" onClick={() => setShowSignModal(false)}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">

            {/* Content for sign up */}
            <IonInput className="ion-text-left" style={{color: "white"}} type="text" placeholder="Name"></IonInput>
            <IonInput className="ion-text-left" style={{color: "white"}} type="text" placeholder="Surname"></IonInput>

            <IonInput className="ion-text-left" style={{color: "white"}} type="email" placeholder="email@domain.com"></IonInput>

            <IonInput className="ion-text-left" style={{color: "white"}} type="password" placeholder="Password"></IonInput>
            <IonInput className="ion-text-left" style={{color: "white"}} type="password" placeholder="Repeat Password"></IonInput>

            <IonButton expand="block" onClick={() => {
              // Sign up
              setShowSignModal(false);

            }}>Sign up</IonButton>
          </IonContent>
        </IonModal>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-sm="4">


              {/* Login form */}
            </IonCol>
            <IonCol size="12" size-sm="4">
              {/* Login form */}
              <IonList className = "loginForm">

                  <IonInput label="Email |" type="email" placeholder="email@domain.com"></IonInput>
                  <IonInput label="Password |" type="password" value="password"></IonInput>

                  <IonButton onClick={logIn} shape="round" expand="full">Log In</IonButton>


                  <IonRow>
                    <IonCol>
                      <IonButton className='foButt' fill='clear' shape="round" onClick={() => setShowPassModal(true)}>Forgot password</IonButton>
                    </IonCol>
                    <IonCol >
                        <IonButton className='crButt' fill='clear' shape="round" onClick={() => setShowSignModal(true)}>Sign up</IonButton>
                      </IonCol>
                  </IonRow>


                  <p className="centerText" >OR</p>

                  <IonButton onClick={() => logUsing3rd("google")} color="danger" expand="full">Log In using Google</IonButton>
                  <IonButton onClick={() => logUsing3rd("twitter")} color="secondary" expand="full">Log In using Twitter</IonButton>
                  <IonButton onClick={() => logUsing3rd("facebook")} color="primary" expand="full">Log In using Facebook</IonButton>
                  <IonButton onClick={() => logUsing3rd("apple")} color="dark" expand="full">Log In using Apple</IonButton>


              </IonList>

            </IonCol>
            <IonCol size="12" size-sm="4">
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonContent>
    </IonPage>
  );
};

export default Home;
