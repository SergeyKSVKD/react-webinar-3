import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import commentsActions from '../../store-redux/comments/actions'
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router';
import shallowequal from 'shallowequal';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../components/spinner';
import CommentForm from '../../components/comment-form'
import CommentsList from '../../components/comments-list'
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Comments() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const parent = useParams().id
    const [type, setType] = useState("comments")
    const [responding, setResponding] = useState("")
    const [commentId, setCommentId] = useState("")

    const cn = bem('CommentsContainer');
    const callbacks = {
        // Переход к авторизации
        onSignIn: useCallback(() => {
            navigate('/login', { state: { back: location.pathname } });
        }, [location.pathname]),
    }

    useInit(() => {
        dispatch(commentsActions.load(parent));
    }, []);

    const selectRedux = useSelectorRedux(state => ({
        comments: state.comments.data,
        count: state.comments.count,
        waiting: state.comments.waiting,
    }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

    const select = useSelector(state => ({
        exists: state.session.exists,
        user: state.session.user.profile?.name,
    }));

    const changeToAnswer = (username, comment_id) => {
        setResponding(username)
        setType("answer")
        setCommentId(comment_id);
        setTimeout(() => {
            const textareaField = document.getElementsByTagName('textarea')[0]
            textareaField && textareaField.focus()
        }, [])
    }
    const changeToComment = () => {
        setType("comments")
        setCommentId("")
    }

    return (
        <div className={cn()}>
            <Spinner active={selectRedux.waiting}>
                {selectRedux.comments ?
                    <CommentsList
                        count={selectRedux.count}
                        comments={selectRedux.comments}
                        answer={changeToAnswer}
                        waiting={selectRedux.waiting}
                        user={select.user}
                        type={type}
                    />
                    : null}
            </Spinner>
            <div data-id="comment" />
            <CommentForm
                exists={select.exists}
                type={type}
                setType={setType}
                title={type === "answer" ? "Новый ответ" : "Новый комментарий"}
                text={type === "answer" ? `Мой ответ для ${responding}` : "Текст"}
                cancel={changeToComment}
                onSignIn={callbacks.onSignIn}
                user={select.user}
                article_id={parent}
                comment_id={commentId}
                setCommentId={setCommentId}
            />
        </div>
    );
}

export default memo(Comments);
