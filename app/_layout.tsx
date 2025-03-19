import { Stack, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from '../context/authContext'
import { useEffect } from "react";

const MainLayout = ()=>{
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(()=>{
    //check whether user is authenticated or not
    if(typeof isAuthenticated=='undefined') return;
    const isApp = segments[0]=='(app)';
    if(isAuthenticated && !isApp){
      //redirect to home page
      router.replace('/home');
    }else if(isAuthenticated==false){
      //redirect to signIn page
      router.replace('/signin');
    }
  },[isAuthenticated])

  return <Stack screenOptions={{headerShown: false}}/>;
}


export default function RootLayout() {
  return(
    <AuthContextProvider>
      <MainLayout/>
    </AuthContextProvider>
  );
}


