import React, { useState, useEffect } from 'react'
// import styles from '../styles/mainNews.module.scsss'
// import styles from '../styles/header.module.scss'
import styles from '../styles/mainNews.module.scss'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useRouter } from 'next/router';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import AddComment from '../components/AddComment';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { LOAD_NEWS } from '../components/GraphQl/Queries';
// import { secondClient } from './_app';
import { REMOVE_USER_LIKE } from '../components/GraphQl/Queries';
import { secondClient } from './utils/App';
import { CREATE_USER_LIKE } from '../components/GraphQl/Queries';
import { GET_NEWS_COMMENTS } from '../components/GraphQl/Queries';
import { useLazyQuery } from '@apollo/client';
import { CREATE_COMMENT_REACTION } from '../components/GraphQl/Mutation';
import { GET_NEWS_BY_FILTER } from '../components/GraphQl/Queries';

const MainNews = ({category, userData}) => {

    // const { error:error1, loading:loaging1, data:data1 } = useQuery(LOAD_NEWS,{
    //     client:secondClient
    // })



    const [ newsDataFunction, {data:data1} ] = useLazyQuery(GET_NEWS_BY_FILTER,{
        client: secondClient,
        fetchPolicy:"no-cache",
        onError: (err) =>
        {
            console.log('graphql error shovan profile', JSON.stringify(err))
        },
        onCompleted: (data) =>
        {
            // console.log('categories data', data)
            // console.log('data from shovan profile', data)
            console.log(data)
        }
    })

        useEffect(()=>{
            newsDataFunction({variables:{ first:10, category:category }})
        },[category])

    const [ comments, setComments ] = useState()

    const router = useRouter()

    const [ openCommentDrawer, setOpenCommentDrawer ] = useState(false)

        
    const nextHandler = () => {
        console.log("kler")
        newsDataFunction({variables:{ first:10, category:category }})

    }


    const closeCommentDrawer = () => {
        setOpenCommentDrawer(false)
    }

    const newsDatas = data1 && data1.news.page.edges;
    console.log(newsDatas,"newsData")

    const [getNewsComments, newsCommentsData] = useLazyQuery(GET_NEWS_COMMENTS, {
        client: secondClient,

        fetchPolicy: 'no-cache',
        onError: (err) =>
        {
            console.log('graphql error shovan 2', JSON.stringify(err))

        },
        onCompleted: (data) =>
        {
            setComments(data)
            // dispatch(setInitialCommentLoading(false))

        }
    });

   

    const [removeUserLike, {
    }
    ] = useMutation(REMOVE_USER_LIKE, {
        client: secondClient,
        onCompleted: (data) =>
        {
        },
        onError: (err) =>
        {
            console.log(err);

        }
    });



    const [createUserLike, {
        loading,
        data,
        error
    }
    ] = useMutation(CREATE_USER_LIKE, {
        client:secondClient,
        onCompleted: (data) =>
        {

        },
        onError: (err) =>
        {
            console.log(err);
        }
    });

    console.log(userData,"userData")

    const likeHandler = (id,like) => {
        console.log(like,"like")
        if(!userData){
            router.push('/login')

        }
        console.log(like,"like")
        if(!like){
            createUserLike({
                variables: {
                    newsId: parseInt(id)
                }
            });
        }
        else {
            removeUserLike({variables: { newsId: +id }})
        }
    }


    const openCommentDrawerHandler = (id,number) => {
        getNewsComments({ variables: { newsId: +id, first: number } });
        setOpenCommentDrawer(true)
    }


    const commentHandler = () => {
     
    }



    return (
        <>
       { openCommentDrawer &&  <AddComment commentHandler={commentHandler} comment={comments} closeHandler={closeCommentDrawer} /> } 
        <div className={styles.mainNewsContainer}>
            <div className={styles.recommendedNewsContainer}>
                { newsDatas && newsDatas.length>0 ? newsDatas.map((news,index)=>{
                    let marginTop="40px";
                    if(index==0){
                        marginTop=0
                    }
                    return (
                <div style={{marginTop:marginTop}}  className={styles.recommendedNewsBox}>
                    { news.node.images.length>0 && (
                        <img className={styles.recommendedImage} src={news.node?.images[0].imageURL} alt="" />
                    ) }
                    <div className={styles.recommendedContent}>
                        <div className={styles.recommendedTitle}>{news.node?.title}</div>
                        <div className={styles.dateContainer}>
                        <DateRangeIcon style={{ fontSize: "16px", color: "gray" }} />
                        <div className={styles.recommendedDate}>{new Date(news?.node?.createdAt).toLocaleString()}</div>
                        </div>
                        <div className={styles.recommendedDesc}>{news.node?.content}</div>
                        <div className={styles.interactions}>
                            <div className={styles.interactionsBox}>
                            <div className={styles.likeCount}>{news.node?.likeCount}</div>
                            <ThumbUpOutlinedIcon  onClick={()=>likeHandler(news?.node?.id,news?.node?.like)}  style={{fontSize:20,color:`${news?.node?.like?"blue":"gray"}`}} />
                            </div>
                            <div  className={styles.interactionsBox}>
                            <div className={styles.commentCount}>{news.node.commentCount}</div>
                            <CommentOutlinedIcon   style={{fontSize:20,color:"gray"}} />
                            </div>
                        </div>
                        <div onClick={()=>router.push(`news/${news.node.id}`)} className={styles.recommendbuttonContainer}>
                            Read more
                            <ArrowForwardIosIcon style={{fontSize:"14px"}} className={styles.arrowIcon}/>
                        </div>
                    </div>
                </div>
                    )
                }):
                <div>Loading ....</div>
            }
            <div onClick={nextHandler} style={{padding:20,cursor:"pointer"}} className={styles.nextButton} >Next</div>
            </div>


            <div className={styles.relatedTopics}>
                        <div className={styles.relatedNewsTitle}>Top Ads</div>
                        <div className={styles.divider}>
                            <div className={styles.dividerColor}></div>

                        </div>
                            <img src="https://www.onlinekhabar.com/wp-content/uploads/2023/03/300-x-200-Online-Khabar1.gif" alt="Computer man" style={{width:"100%",marginTop:"20px"}} />
                            <img src="https://npcdn.ratopati.com/media/promo/machapuchree-bank_k8S0FE3TWD.gif" alt="Computer man" style={{width:"100%",marginTop:"20px"}} />
                            <img src="https://npcdn.ratopati.com/media/promo/NariBachat-300-x-250_HMcE9sO7wZ.gif" alt="Computer man" style={{width:"100%",marginTop:"20px"}} />

                        {/* {relatedData.map((data, index) => {
                            return (
                                <div onClick={()=>router.push('/news/1')} className={styles.relatedNewsBox} key={index} >
                                    <img src={data.img} className={styles.relatedNewsImage} />
                                    <div>
                                        <div className={styles.relatedNewsTitle}>{data.title}</div>
                                        <div style={{ display: "flex", gap: "4px", alignItems: "center", marginTop: "12px" }} >
                                            <DateRangeIcon style={{ fontSize: "16px", color: "gray" }} />
                                            <div className={styles.newsDate}>14 Jul, 2022 13:08 PM</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })} */}
                    </div>
        </div>
        </>
    )
}

export default MainNews
