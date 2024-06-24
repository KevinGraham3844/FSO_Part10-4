import { View, TextInput, Pressable } from 'react-native'
import Text from './Text'
import { useFormik } from 'formik'
import { formStyles, FormikTouched } from './ReviewForm'
import * as yup from 'yup';
import createUser from '../hooks/createUser';


const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
}

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be at least 5 characters')
        .required('Username is required'), 
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required')
        .oneOf([yup.ref('password'), null], "Passwords don't match")
        
})

const SignUpForm = ({ refetch }) => {
    // eslint-disable-next-line no-unused-vars
    const [submitNewUser, { data }] = createUser();
    
    const onSubmit = async (values) => {
        const { username, password } = values;
        await submitNewUser({ username, password, refetch})
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });

    return (
        <View style={formStyles.container}>
            <TextInput
                style={formik.touched.username && formik.errors.username ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder='Username'
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <FormikTouched touched={formik.touched.username} error={formik.errors.username} />
            <TextInput
                style={formik.touched.password && formik.errors.password ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder='Password'
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            <FormikTouched touched={formik.touched.password} error={formik.errors.password} />
            <TextInput
                style={formik.touched.confirmPassword && formik.errors.confirmPassword ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder='Password confirmation'
                value={formik.values.confirmPassword}
                onChangeText={formik.handleChange('confirmPassword')}
            />
            <FormikTouched touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword} />
            <Pressable
                style={formStyles.button}
                onPress={formik.handleSubmit}
            >
                <Text color='language' style={formStyles.submissionText}>Sign up</Text>
            </Pressable>
        </View>
    )
}

export default SignUpForm;