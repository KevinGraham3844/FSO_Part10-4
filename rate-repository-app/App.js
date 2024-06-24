import { StatusBar } from "react-native";
import Main from "./src/components/Main";
import { NativeRouter } from "react-router-native";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./src/utils/apolloClient";
import AuthStorage from "./src/utils/authStorage";
import AuthStorageContext from "./src/contexts/AuthStorageContext";

const authStorage = new AuthStorage();

const apolloClient = createApolloClient(authStorage);

const App = () => {
  const isHermes = () => !!global.HermesInternal;
  console.log('Hermes Enabled: ', isHermes());
  return (
    <>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
        </ApolloProvider> 
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  )
};

export default App;