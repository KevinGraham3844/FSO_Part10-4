import Text from './Text'
import { TextInput, Pressable, View, StyleSheet } from 'react-native'
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required')
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 3,
        
    },
    inputError: {
        borderColor: 'red'
    },
    button: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#0366d6'
    },
    signInText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    ErrorMessage: {
        color: 'red'
    }
})


export const SigninForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });
    
   
    return (
        <View style={styles.container}>
            <TextInput
                style={formik.touched.username && formik.errors.username ? {...styles.input, borderColor: 'red'} : styles.input}
                placeholder='username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={formik.touched.username && formik.errors.username ? {...styles.input, borderColor: 'red'} : styles.input}
                placeholder='password'
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
            )}
            <Pressable 
                style={styles.button}
                onPress={formik.handleSubmit}>
                <Text color='language' style={styles.signInText}>Sign in</Text>
            </Pressable>    
        </View>
    )
}
 
const SignIn = ({ refetch }) => {
    // eslint-disable-next-line no-unused-vars
    const [signIn, { data }] = useSignIn();
    
    const onSubmit = async (values) => {
        const { username, password } = values;
        await signIn({ username, password, refetch});
    }

    return (
        <View>
            <SigninForm onSubmit={onSubmit}/>
        </View>
    ); 
};

export default SignIn;