export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: (parent) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${parent}`
        });
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });

      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    }
  },

  post: (text, user, _id) => {
    console.log(text, user, _id);
    return async (dispatch, getState, services) => {
      try {
        const token = localStorage.getItem('token');
        const comment = JSON.stringify({ text: text, parent: { _id: _id, _type: "article" } });
        if (token && text) {
          const res = await services.api.request({
            url: "/api/v1/comments",
            method: "POST",
            body: comment
          })
          console.log(res);
          dispatch({ type: 'comment/load-success', payload: { data: { ...res.data.result, author: { profile: { name: user, _id: res.data.result.author._id } } } } });
        } else console.log('Пользователь не авторизован или пустой текст комментария')
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    }
  }
}
