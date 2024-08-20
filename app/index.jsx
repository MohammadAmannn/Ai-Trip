import { Text, View } from "react-native";
import Login from '../components/Login'
import{auth} from './../configs/FirebaseConfig'
import { Redirect } from "expo-router";

export default function Index() {


  // check if user alredy login or not
const user=auth.currentUser;

  return (
    <View
      
    >

{user? 
  <Redirect href={'/MyTrip'}/>:
  
<Login/>
}

    
    </View>
  );
}
