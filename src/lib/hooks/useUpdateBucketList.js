import { useMutation, gql } from "@apollo/client";

const UPDATE_BUCKET_LIST = gql`
  mutation ($input: UpdateBlMutationInput!) {
    updateBlMutation(input: $input) {
      bucketListUpdated
    }
  }
`;

export const useUpdateBucketList = () => {
  const [updateBlMutation] = useMutation(UPDATE_BUCKET_LIST);

  return updateBlMutation;
};
