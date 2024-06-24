import Text from "./Text";
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { useFormik } from "formik";
import * as yup from 'yup';
import { useMutation } from "@apollo/client";
import { SUBMIT_REVIEW } from "../../mutations";
import { useNavigate } from "react-router-native";

export const formStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexGrow: 1,
        flexDirection: 'column',    
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
    submissionText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    ErrorMessage: {
        color: 'red'
    }
})

export const FormikTouched = ({ touched, error }) => {
    return (
        <View>
            {touched && error && (
                <Text style={{ color: 'red', marginLeft: 10 }}>{error}</Text>
            )}
        </View>
    )
}

const validationSchema = yup.object().shape({
    repoOwner: yup
        .string()
        .required('Repo Owner name is required'),
    repoName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .string()
        .required('Rating is required'),
    review: yup
        .string()
        .min(15, 'Review must be at least 15 characters')
        .required('must provide review before submission')
})


const initialValues = {
    repoOwner: '',
    repoName: '',
    rating: '',
    review: ''
}

const submitReviews = async () => {
    const [submit, result] = useMutation(SUBMIT_REVIEW);
    const navigate = useNavigate();

    const submitUserReview = async (values) => {
        const { repoOwner, repoName, rating, review } = values
        try {
            const { data } = await submit({
                variables: {
                    review: {
                        ownerName: repoOwner,
                        repositoryName: repoName,
                        rating: Number(rating),
                        text: review
                    }
                } 
            });
            navigate(`/${data.createReview.repositoryId}`)
            return data
        } catch (error) {
            console.error(error);
            return { error: error.graphQLErrors[0].message || error.message}
        }
    };
    
    return [submitUserReview, result]
}

const ReviewForm = () => {
    const mutationDetails = submitReviews();
    const submitUserReview = mutationDetails._j[0];
    
    const onSubmit = async (values) => {
        try {
            await submitUserReview(values);
        } catch (e) {
            console.log(e)
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit
    });  

    

    return (
        <View style={formStyles.container}>
            <TextInput
                style={formik.touched.repoOwner && formik.errors.repoOwner ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder="Repository owner name"
                value={formik.values.repoOwner}
                onChangeText={formik.handleChange('repoOwner')}
            />
            <FormikTouched touched={formik.touched.repoOwner} error={formik.errors.repoOwner} />
            <TextInput
                style={formik.touched.repoName && formik.errors.repoName ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder="Repository name"
                value={formik.values.repoName}
                onChangeText={formik.handleChange('repoName')}
            />
            <FormikTouched touched={formik.touched.repoName} error={formik.errors.repoName} />
            <TextInput
                style={formik.touched.rating && formik.errors.rating ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder="Rating between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
            />
            <FormikTouched touched={formik.touched.rating} error={formik.errors.rating} />
            <TextInput
                
                style={formik.touched.review && formik.errors.review ? {...formStyles.input, borderColor: 'red'} : formStyles.input}
                placeholder="Review"
                value={formik.values.review}
                onChangeText={formik.handleChange('review')}
            />
            <FormikTouched touched={formik.touched.review} error={formik.errors.review} />
            <Pressable
                style={formStyles.button}
                onPress={formik.handleSubmit}
            >
                <Text color='language' style={formStyles.submissionText}>Create a review</Text>
            </Pressable>
        </View>
    )
}

export default ReviewForm
