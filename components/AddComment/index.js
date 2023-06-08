import React from 'react'
import styles from '../../styles/AddComment.module.scss'
import CommentBox from '../CommentBox'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const AddComment = ( props ) => {

    const { closeHandler,commentHandler, comment } = props ;
    return (
        <div onClick={commentHandler} className={styles.addCommentBox} >
            <ClearOutlinedIcon onClick={closeHandler} style={{color:"red", cursor:"pointer"}} />
            <CommentBox  comment={comment} drawer />
        </div>
    )
}

export default AddComment
