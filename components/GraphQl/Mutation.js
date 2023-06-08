import { gql } from '@apollo/client'


export const CREATE_COMMENT_REACTION = gql`
mutation createCommentLikes($createCommentInput:CreateUserLikesNewsCommentInput!){
  createUserLikesNewsComment(
    createUserLikesNewsCommentInput: $createCommentInput){
     react
    userId      
}}`


export const USER_LOGOUT = gql`
mutation{
  revokeToken{
  revoked
  }
  }`


export const DELETE_TOKEN_COOKIE = gql`
mutation{
  deleteTokenCookie{
    deleted
  }
}`

export const CREATE_USER_COMMENT = gql`
mutation 
createComment($content:String!, $news:Int!) {
  createNewsComment(createNewsCommentInput:{content:$content, news:$news})
  {
    author
    authorDetail{
      name
      id
      profile{
        image
      }
    }
    id
    content
    replyCount
    likeCount
    like{
      userId
    }
  }
}`



export const ACCOUNT_REGISTER_WITH_PHONE = gql`
mutation userRegister($username: String!, $password: String!,$fullName:String!){
  userCreate(
    input: {
      username: $username, 
      password: $password,
      fullName: $fullName,
      
    }) 
    {
  user{
    id
    firstName
    lastName
    username
  }

}
}
`;

export const CREATE_USER_INTEREST = gql`
mutation createUserInterest( $newsCatIds: [Int!] ){
  createUserInterests(
    createUserInterestsInput:{ newsCategories: $newsCatIds}
    ){
  userId
   }
}
`

export const OTP_VERIFICATION = gql`
mutation verifyUser($otp:String!, $username:String!){
  userOtpVerify(input:{otp:$otp, username:$username}){
    user{
      id
      firstName
      username
    }
   
  }
}

`;