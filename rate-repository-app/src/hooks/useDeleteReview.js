import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../../mutations"
import { useNavigate } from "react-router-native";

const useDeleteReview = () => {
    const navigate = useNavigate();
    const [mutate, { data }] = useMutation(DELETE_REVIEW);

    const executeDelete = async (reviewId, refetch) => {
        try {
            const { data } = await mutate({
                variables: {
                    deleteReviewId: reviewId
                }
            })
            refetch();
            navigate('/userReviewList');
            return data
        } catch (error) {
            console.error('Error deleting review', error)
        }
    }
    return [executeDelete, { data }]
}

export default useDeleteReview;