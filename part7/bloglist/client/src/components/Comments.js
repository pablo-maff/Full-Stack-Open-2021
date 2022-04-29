const Comments = ({ blog }) => {
  console.log(blog)
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
