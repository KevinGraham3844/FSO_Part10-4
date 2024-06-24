import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../mutations";
import useSignIn from "./useSignIn";

const createUser = () => {
    const [create, { data }] = useMutation(CREATE_USER);
    const [signIn] = useSignIn();
    const submitNewUser = async ({ username, password, refetch}) => {
        try { 
            const { data } = await create({
                variables: {
                    user: {
                        username: username,
                        password: password
                    }
                }
            });
            console.log(data)
            await signIn({ username, password, refetch});
            return data
        } catch (error) {
            console.error('Error signing in: ', error)
        }
    }
    return [submitNewUser, { data }]
}

export default createUser