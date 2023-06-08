import { gql } from '@apollo/client'

export const LOAD_NEWS = gql`
query{news(first:50){
  page{
    edges{
      cursor
      node{
        commentCount
        id
        imgSource
        createdAt
        title
        like{
          userId
        }
        likeCount
        images{
          imageURL
        }
        content
      }
    }
  }
}}
`


export const LOAD_SPECIFIC_NEWS = gql`
query News($id:Int!){
    newsById(id:$id){
      commentCount
      category{
        id
      }
        id
        createdAt
        imgSource
        title
        likeCount
    
        images{
          imageURL
        }
        content
    }
}
`



export const ACCOUNT_LOGIN_WITH_PHONE = gql`
mutation loginWithPhone($username: String!, $password: String!){
  createToken(
      username: $username, 
      password: $password,
    ) 
    {
  user{
    id
    username,
    firstName
  }
 
}
}
`;



export const CREATE_USER_LIKE = gql`
mutation createLikes($newsId: Int!){
  createUserLikesNews(createUserLikesNewsInput: {newsId:$newsId}){
   news{
    id
    likeCount
    like{
      userId
    }
  }
  }
}
`


export const REMOVE_USER_LIKE = gql`
mutation removeLikes($newsId: Int!){
  removeUserLikesNews(newsId:$newsId){
    news{
     id
     likeCount
     like{
       userId
     }
   }
   }
}
`



export const NEWS_COMMENTS_FRAGMENT = gql`
fragment newsCommentsFragment on NewsComment{
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
  createdAt
  replyCount
  likeCount
  
  like{
    userId
    react
  }
}`


export const GET_NEWS_COMMENTS = gql`
query
newsComment($first:Float,$newsId:Int!){
  newsComments(first:$first,newsId:$newsId){
    page{
    edges{
      node{
        author
        content
        authorDetail{
          name
          profile{
            image
          }
        }
      }
    }
  }
  }
}
`

export const GET_NEW_CATEGORIES = gql`
query newsCat{
  newsCategories{
    id
    name
  }
}`


// export const GET_NEWS_COMMENTS = gql`
// query
// newsComment($first:Float,$newsId:Int!){
//   newsComments(first:$first,newsId:$newsId){
//     pageData{
//       curTime
//     }
//     page{
//       pageInfo{
//         hasNextPage
//       }
//       edges{
//         cursor
//         node{
//           author
//   authorDetail{
//     name
//     id
//     profile{
//       image
//     }
//   }
//   id
//   content
//   createdAt
//   replyCount
//   likeCount
//   reactCounts{
//     angry
//     haha
//     love
//     sad
//     wow
//   }
//   like{
//     userId
//     react
//   }

//   }
// }
// }
//   }
// }
// `












export const GET_NEWS_BY_FILTER = gql`
  query getNewsByFilter($first:Float, $category:Int){
  news(first:$first,filterNewsInput:{category:$category} ){
    page{
    edges{
      cursor
      node{
        commentCount
        id
        imgSource
        createdAt
        title
        like{
          userId
        }
        likeCount
        images{
          imageURL
        }
        content
      }
    }
  } 
  }
  }`

