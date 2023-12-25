import { memo, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { cn as bem } from '@bem-react/classname';
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';

function CommentForm({
    exists,
    title = "Новый комментарий",
    text = "Текст",
    type = 'comments',
    setType,
    cancel,
    onSignIn,
    user,
    article_id,
    comment_id,
    setCommentId,
}) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')
    let id = !comment_id ? article_id : comment_id
    let typeC = comment_id ? 'comment' : 'article'

    const postComment = (e) => {
        e.preventDefault()
        dispatch(commentsActions.post(comment, user, id, typeC))
        setComment('')
        setType('comments')
        setCommentId('')
    }

    const cn = bem('CommentForm');

    const commentFormRootElement = document.querySelector(`[data-id="${comment_id}"]`)
    const commentDefaultFormRootElement = document.querySelector(`[data-id="comment"]`)
    const element = useMemo(() => document.createElement('div'), [])

    useEffect(() => {
        setComment(`${text} `)
        if (commentFormRootElement) {
            commentFormRootElement && commentFormRootElement.appendChild(element)
        }
        else {
            commentDefaultFormRootElement && commentDefaultFormRootElement.appendChild(element)
        }

        return () => {
            if (commentFormRootElement) {
                commentFormRootElement && commentFormRootElement.removeChild(element)
            }
            else {
                commentDefaultFormRootElement && commentDefaultFormRootElement.removeChild(element)
            }
        }
    }, [commentDefaultFormRootElement, commentFormRootElement, exists, type, comment_id, article_id])

    return createPortal(<Form
        exists={exists}
        type={type}
        title={title}
        text={text}
        setType={setType}
        cancel={cancel}
        onSignIn={onSignIn}
        user={user}
        article_id={article_id}
        comment_id={comment_id}
        setCommentId={setCommentId}
        comment={comment}
        setComment={setComment}
        postComment={postComment}
    />, element)
}

function Form({
    exists,
    type,
    title,
    cancel,
    onSignIn,
    comment,
    setComment,
    postComment,
}) {
    const cn = bem('CommentForm');

    return (<>
        {!exists && <div style={{ paddingLeft: type === 'answer' ? '30px' : null }}>
            <button
                className={cn("link")}
                onClick={onSignIn}
            >
                Войдите
            </button>, чтобы иметь возможность {type === 'answer' ? 'ответить.' : 'комментировать.'}
            {type === 'answer' ? <button className={cn('cancel')} onClick={cancel}>Отмена</button> : null}
        </div>}

        {exists && <div className={cn("comment")} style={{ paddingLeft: type === 'answer' ? '30px' : null }}>
            <p className={cn("title")}>{title}</p>
            <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button onClick={postComment} className={cn("send")}>Отправить</button>
            {type === "answer" ?
                <button onClick={(e) => {
                    cancel()
                }} className={cn("cancel")}>Отмена</button>
                : null
            }
        </div>}
    </>)
}

CommentForm.propTypes = {
    exists: PropTypes.bool,
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    setType: PropTypes.func,
    cancel: PropTypes.func,
    onSignIn: PropTypes.func,
    user: PropTypes.string,
    article_id: PropTypes.string,
    comment_id: PropTypes.string,
    setCommentId: PropTypes.func,
};

CommentForm.defaultProps = {
    func: () => {
    }
}

export default memo(CommentForm);