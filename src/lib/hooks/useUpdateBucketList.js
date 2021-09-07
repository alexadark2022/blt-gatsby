import { useMutation, gql } from "@apollo/client";
import { GET_BUCKET_LIST } from "../queries";
import { useAuth } from "./useAuth";
import { useQuery } from "@apollo/client";

const UPDATE_BUCKET_LIST = gql`
  mutation ($input: UpdateBlMutationInput!) {
    updateBlMutation(input: $input) {
      bucketListUpdated
    }
  }
`;

export const useUpdateBucketList = () => {
  // const { user, loggedIn } = useAuth();
  // const { data, loading, error } = useQuery(GET_BUCKET_LIST, {
  //   variables: { title: user?.email },
  // });
  const [updateBlMutation] = useMutation(UPDATE_BUCKET_LIST);

  return updateBlMutation;
};
