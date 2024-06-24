import { useNavigate } from "react-router-native";
import useAuthStorage from "./useAuthStorage";
import { useMutation } from "@apollo/client";
import { useApolloClient } from "@apollo/client";
import { LOGIN } from '../../mutations'


const useSignIn = () => {
    const navigate = useNavigate();
    const authStorage = useAuthStorage();
    const [mutate, { data }] = useMutation(LOGIN);
    const apolloClient = useApolloClient();

    const signIn = async ({ username, password, refetch }) => {
        try {
            const { data } = await mutate({
                variables: {
                    credentials: {
                        username: username,
                        password: password
                    }
                }
            });
            await authStorage.setAccessToken(data.authenticate.accessToken);
            apolloClient.resetStore();
            refetch();
            navigate('/');
            return data;
        } catch (error) {
            console.error('Error signing in:', error)
        }
    }

    return [signIn, { data }];
}


export default useSignIn;