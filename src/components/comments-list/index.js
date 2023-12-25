import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { format } from "date-fns";
import { ru } from 'date-fns/locale'
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function CommentsList({
    count = 0,
    comments = [],
    answer,
    waiting,
    user,
    type = 'comment',
}) {
    const cn = bem('CommentsList');
    const formattedComments = {
        comments: treeToList(listToTree(comments), (item, level) => ({
            _id: item._id,
            text: item.text,
            dateCreate: item.dateCreate,
            author: item.author,
            parent: item.parent,
            isDeleted: item.isDeleted,
            children: item.children,
            level: level - 1,
        })).slice(1)
    }

    return (
        <>
            <p className={cn("count")}>Комментарии ({count})</p>
            {!waiting ? formattedComments.comments.map(item => <div
                className={cn()}
                style={{
                    paddingLeft: `${item.level * 30}px`
                }}
                key={item._id}>
                <p className={cn("comment-title")}>
                    <span
                        className={cn("user")} style={{
                            color:
                                item.author.profile.name === user ?
                                    "#666666" : "#000000",
                        }}
                    >{item.author.profile.name}</span>
                    <span
                        className={cn("date")}
                    >{format(new Date(item.dateCreate), "dd MMMM yyyy в HH:mm", { locale: ru })}</span>
                </p>
                <p>{item.text}</p>
                {type != 'answer' ?
                    <button className={cn("answer")} onClick={(e) => {
                        answer(item.author.profile.name, item._id)
                    }}>Ответить</button>
                    : null
                }
                <div data-id={item._id} />
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