import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { format } from "date-fns";
import { ru } from 'date-fns/locale'

function CommentsList({ count = 0, comments = [], answer, waiting }) {
    const cn = bem('CommentsList');
    return (
        <>
            <p className={cn("count")}>Комментарии ({count})</p>
            {!waiting ? comments.map(item => <div
                className={cn()}
                key={item._id}>
                <p className={cn("comment-title")}>
                    <span
                        className={cn("user")}
                    >{item.author.profile.name}</span>
                    <span
                        className={cn("date")}
                    >{format(new Date(item.dateCreate), "dd MMMM yyyy в HH:mm", { locale: ru })}</span>
                </p>
                <p>{item.text}</p>
                <button className={cn("answer")} onClick={() => answer(item.author.profile.name, item._id)}>Ответить</button>
            </div>) : <p className={cn("loading")}>...</p>}
        </>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    count: PropTypes.number,
    answer: PropTypes.func,
};

CommentsList.defaultProps = {
    func: () => {
    }
}

export default memo(CommentsList);