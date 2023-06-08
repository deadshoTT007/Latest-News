import React, { useState } from 'react'
import styles from '../styles/commentbox.module.scss'
import { useRouter } from 'next/router';

const CommentBox = ( props ) => {

  const { drawer, comment, commentHandler, newsComment } = props ;

  const [commentText, setCommentText] = useState("")

  const router = useRouter()

  const id = router.query.newsId;

  const onChangeHandler = (e) => {
    setCommentText(e.target.value)
  }

console.log(comment,"comment")

  const comments = [
    {
      commentTitle: "Is that your picture next to charming in the dictionary",
      image: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/325560920_536004971894544_5684022705902135203_n.jpg?stp=c0.0.48.48a_cp0_dst-jpg_p48x48&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tEWJT3CFcnsAX_S7Ktf&_nc_ht=scontent.fktm8-1.fna&edm=AJqh0Q8EAAAA&oh=00_AfCEStO3_9x3XCdqd4RQhxjyzMLET0ItGpD7Lrc7OMUeVw&oe=6404E1DB",
      username: "Manish Kharel"
    },
    {
      commentTitle: "Is that your picture next to charming in the dictionary",
      image: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/325560920_536004971894544_5684022705902135203_n.jpg?stp=c0.0.48.48a_cp0_dst-jpg_p48x48&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tEWJT3CFcnsAX_S7Ktf&_nc_ht=scontent.fktm8-1.fna&edm=AJqh0Q8EAAAA&oh=00_AfCEStO3_9x3XCdqd4RQhxjyzMLET0ItGpD7Lrc7OMUeVw&oe=6404E1DB",
      username: "Manish Kharel"
    },
    {
      commentTitle: "Is that your picture next to charming in the dictionary",
      image: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/325560920_536004971894544_5684022705902135203_n.jpg?stp=c0.0.48.48a_cp0_dst-jpg_p48x48&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tEWJT3CFcnsAX_S7Ktf&_nc_ht=scontent.fktm8-1.fna&edm=AJqh0Q8EAAAA&oh=00_AfCEStO3_9x3XCdqd4RQhxjyzMLET0ItGpD7Lrc7OMUeVw&oe=6404E1DB",
      username: "Manish Kharel"
    },
    {
      commentTitle: "Is that your picture next to charming in the dictionary",
      image: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/325560920_536004971894544_5684022705902135203_n.jpg?stp=c0.0.48.48a_cp0_dst-jpg_p48x48&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tEWJT3CFcnsAX_S7Ktf&_nc_ht=scontent.fktm8-1.fna&edm=AJqh0Q8EAAAA&oh=00_AfCEStO3_9x3XCdqd4RQhxjyzMLET0ItGpD7Lrc7OMUeVw&oe=6404E1DB",
      username: "Manish Kharel"
    },
    {
      commentTitle: "Is that your picture next to charming in the dictionary",
      image: "https://scontent.fktm8-1.fna.fbcdn.net/v/t39.30808-1/325560920_536004971894544_5684022705902135203_n.jpg?stp=c0.0.48.48a_cp0_dst-jpg_p48x48&_nc_cat=107&ccb=1-7&_nc_sid=dbb9e7&_nc_ohc=tEWJT3CFcnsAX_S7Ktf&_nc_ht=scontent.fktm8-1.fna&edm=AJqh0Q8EAAAA&oh=00_AfCEStO3_9x3XCdqd4RQhxjyzMLET0ItGpD7Lrc7OMUeVw&oe=6404E1DB",
      username: "Manish Kharel"
    },
  ]
  return (
    <div  style={{marginTop:drawer?"40px":"100px"}} className={styles.commentBox}>
      <div className={styles.commentTitle}>Comments </div>
        { newsComment && newsComment.length>0 && newsComment.map((comment,index)=>{
          console.log(comment,"cc")
          return (
            <div key={index} className={styles.userComment}>
              { comment?.node?.authorDetail?.profile?.image ? (
                <img  className={styles.userCommentImage} src={comment?.node?.authorDetail?.profile?.image} alt="" />
              ):
              <div className={styles.userCommentImage}/>
              }
              <div>
                <div className={styles.userCommentName}>{comment?.node?.authorDetail?.name}</div>
                <div className={styles.userCommentTitle}>{comment?.node?.content}</div>
              </div>

            </div>
          )
        }) }

      <div className={styles.divider}>
        <div className={styles.dividerColor}></div>
      </div>
      <div className={styles.commentInputContainer}>
      <div style={{marginBottom:20}} className={styles.commentTitle}>Write a Comment</div>
        <textarea onChange={onChangeHandler} className={styles.commentInput} placeholder="Add a comment" />
        {commentText && (
          <button onClick={()=>commentHandler({ variables: { content: commentText, news: +id } })} className={styles.commentButton} >Write a comment</button>
        )}
      </div>
    </div>
  )
}

export default CommentBox