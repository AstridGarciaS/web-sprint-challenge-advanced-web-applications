import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)

  // ✨ where are my props? Destructure them here

  useEffect(() => {
    const { currentArticleId } = props;
    if (currentArticleId) {
      setValues({
        title: currentArticleId.title,
        text: currentArticleId.text,
        topic: currentArticleId.topic,
      });
    } else {
      setValues(initialFormValues);
    }
  }, [props.currentArticleId]);

  const onChange = evt => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = evt => {
    evt.preventDefault();
    if (props.currentArticleId) {
      props.updateArticle({
        article_id: props.currentArticleId.article_id,
        article: values,
      });
    } else {
      props.postArticle(values);
    }
    setValues(initialFormValues);
  };

  const isDisabled = () => {
    if (values.title.trim().length >= 1 || values.text.trim().length >= 1) {
      return false;
    } else {
      return true;
    }
  };
  
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>{!props.currentArticle ? 'Create Article': 'Edit'}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={Function.prototype}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}