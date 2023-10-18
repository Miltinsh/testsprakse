// FILE LogIn.tsx PT1
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonGrid, IonRow, IonInput, IonCheckbox, IonList, IonButton, IonModal } from '@ionic/react';
import './LogIn.css';
import { insertUser, logInAuth, resetPassword } from '../services/database.service';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const logUsing3rd = function (platform: string) {
  switch (platform) {
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

const Home: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const history = useHistory();
  const [showPassModal, setShowPassModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');


  const [user, setUser] = useState(null);

  const validateEmail = (email: string) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const areInputsValid = () => {
    return (
      name.trim() !== '' &&
      surname.trim() !== '' &&
      validateEmail(email) &&
      password.trim() !== '' &&
      repeatPassword.trim() !== '' &&
      isAgreed
    );
  };

  const handleLogin = async () => {
    try {
      const userData = await logInAuth(loginEmail, loginPassword);
      if (userData) {
        setUser(userData);  // Store user data in state
        history.push('/UserProfile', { user: userData }); // Navigate to user profile with user data
      } else {
        alert('Incorrect email and/or password!');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  }

  const handleSignUp = async () => {
    if (password.trim() === repeatPassword.trim()) {
      try {
        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds (adjust as needed)
  
        // Store the hashed password in the database
        await insertUser(name, surname, email, hashedPassword); // Pass the hashed password here
        setShowSignModal(false);
        console.log(name, surname, email, hashedPassword)
      } catch (error: any) {
        if (error.message && error.message.includes('Email is already in use!')) {
          alert('Email is already in use!');
        } else {
          // Handle any other errors that may occur.
          console.error('An error occurred:', error);
          alert('An error occurred during registration. Please try again.');
        }
      }
    } else {
      console.log("Password:", password, "Repeat Password:", repeatPassword);
      alert("Passwords do not match!")
    }
  };

// FILE LogIn.tsx PT2
  const handleRenewPass = async () => {
    console.log("Password:", newPassword, "Repeat Password:", repeatNewPassword);
    if (newPassword.trim() === repeatNewPassword.trim()) {
      try {
        await resetPassword(resetEmail, newPassword);
        setShowPassModal(false);
      } catch (error: any) {
        if (error.message && error.message.includes('Email is already in use!')) {
          alert('Email is already in use!');
        } else {
          console.error('An error occurred:', error);
          alert('An error occurred during password change. Please try again.');
        }
      }
    } else {
      console.log("Password:", newPassword, "Repeat Password:", repeatNewPassword);
      alert("Passwords do not match!")
    }
  };


  useEffect(() => {
    console.log("Password:", password, "Repeat Password:", repeatPassword);
  }, [password, repeatPassword]);
  useEffect(() => {
    console.log("resetEmail. newPassword,repeatNewPassword has changed:", resetEmail, newPassword, repeatNewPassword);
  }, [resetEmail, newPassword, repeatNewPassword]);

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
              <IonTitle>Forgot Password</IonTitle>emailReset
              <IonButton slot="end" onClick={() => setShowPassModal(false)}>Close</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {/* Content for forgot password */}
            <p className="ion-text-left" style={{ color: "white" }}>Provide your email to reset your password:</p>
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="email"
              placeholder="email@domain.com"
              value={resetEmail}
              onIonChange={e => setResetEmail(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="password"
              placeholder="New Password"
              value={newPassword}
              onIonChange={e => setNewPassword(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="password"
              placeholder="Repeat New Password"
              value={repeatNewPassword}
              onIonChange={e => setRepeatNewPassword(e.detail.value!.toString())}
            />
            <IonButton expand="block" onClick={() => setTimeout(handleRenewPass, 100)}>Reset Password</IonButton>
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
{/* // FILE LogIn.tsx PT3 */}<IonInput  
              className="ion-text-left"
              style={{ color: "white" }}
              type="text"
              placeholder="Name"
              value={name}
              onIonChange={e => setName(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="text"
              placeholder="Surname"
              value={surname}
              onIonChange={e => setSurname(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="email"
              placeholder="email@domain.com"
              value={email}
              onIonChange={e => setEmail(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="password"
              placeholder="Password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!.toString())}
            />
            <IonInput
              className="ion-text-left"
              style={{ color: "white" }}
              type="password"
              placeholder="Repeat Password"
              value={repeatPassword}
              onIonChange={e => setRepeatPassword(e.detail.value!.toString())} />
            <IonCheckbox labelPlacement='end' onIonChange={e => setIsAgreed(e.detail.checked)}>I agree to the terms and conditions.</IonCheckbox>
            <IonButton expand="block" onClick={() => setTimeout(handleSignUp, 100)} disabled={!areInputsValid()}>Sign up</IonButton>
          </IonContent>
        </IonModal>

        <IonGrid>
          <IonRow>
            <IonCol size="12" size-sm="4">


              {/* Login form */}
            </IonCol>
            <IonCol size="12" size-sm="4">
              {/* Login form */}
              <IonList className="loginForm">
                <IonInput
                  label="Email |"
                  type="email"
                  placeholder="email@domain.com"
                  onIonChange={e => {
                    if (typeof e.detail.value === 'string') {
                      setLoginEmail(e.detail.value);
                    }
                  }}
                />
                <IonInput
                  label="Password |"
                  type="password"
                  onIonChange={e => {
                    if (typeof e.detail.value === 'string') {
                      setLoginPassword(e.detail.value);
                    }
                  }}
                />
                <IonButton onClick={() => setTimeout(handleLogin, 100)} shape="round" expand="full">Log In</IonButton>
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
                <IonButton onClick={() => logUsing3rd("facebook")} color="primary" expand="full">Log In using Facebook</IonButton> {/* // FILE LogIn.tsx PT4 */}
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
// END OF FILE