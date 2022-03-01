import Button from "./Button"

const BlogForm = ({ 
  onSubmit,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl }) => {

  return (
    <>
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={onSubmit}>
          <div>
            Title:
            <input
            type='title'
            value={title}
            name='Title'
            onChange={handleTitle}
            />
          </div>
          <div>
            Author:
            <input
            type='author'
            value={author}
            name='Author'
            onChange={handleAuthor}
            />
          </div>
          <div>
            URL:
            <input
            type='url'
            value={url}
            name='URL'
            onChange={handleUrl}
            />
          </div>
          <Button type='submit' text='Create' />
        </form>
      </div>
    </>
  )
}

export default BlogForm