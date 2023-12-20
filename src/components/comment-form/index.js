import { memo, useState } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { cn as bem } from '@bem-react/classname';
import commentsActions from '../../store-redux/comments/actions'
import { useDispatch } from 'react-redux';

function CommentForm({ title = "Новый комментарий", text = "Текст", type = 'comment', cancel, user, article_id }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState('')

    const postComment = (e) => {
        e.preventDefault()
        dispatch(commentsActions.post(comment, user, article_id))
        setComment('')
    }

    const cn = bem('CommentForm');
    return (

        <div className={cn("comment")}>
            <p className={cn("title")}>{title}</p>
            <textarea placeholder={text}
                value={comment}
                onChange={e => setComment(e.target.value)}
            />
            <button onClick={postComment} className={cn("send")}>Отправить</button>
            {type === "answer" ?
                <button onClick={() => cancel()} className={cn("cancel")}>Отмена</button>
                : null
            }
        </div>
    )
}

CommentForm.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
};

CommentForm.defaultProps = {
    func: () => {
    }
}

export default (CommentForm);