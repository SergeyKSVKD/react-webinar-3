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

    const changeToAnswer = (username) => {
        setResponding(username)
        setType("answer")
    }
    const changeToComment = () => {
        setType("comment")
    }

    return (
        <div className={cn()}>
            <Spinner active={selectRedux.waiting}>
                {selectRedux.comments ?
                    <CommentsList
                        comments={selectRedux.comments}
                        count={selectRedux.count}
                        answer={changeToAnswer}
                        waiting={selectRedux.waiting}
                    />
                    : null}
            </Spinner>
            {!select.exists ?
                <>
                    <button
                        className={cn("link")}
                        onClick={callbacks.onSignIn}>Войдите</button>
                    , чтобы иметь возможность {type === 'answer' ? 'ответить.' : 'комментировать.'}
                    {type === 'answer' ? <button className={cn('cancel')} onClick={changeToComment}>Отмена</button> : null}
                </>
                :
                <CommentForm
                    type={type}
                    title={type === "answer" ? "Новый ответ" : "Новый комментарий"}
                    text={type === "answer" ? `Мой ответ для ${responding}` : "Текст"}
                    cancel={changeToComment}
                    user={select.user}
                    article_id={parent}
                />
            }
        </div>
    );
}

export default memo(Comments);
