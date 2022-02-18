// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length) {
    return blogs.reduce((prevVal, currVal) => prevVal + currVal)
  } else return 0
}

const favouriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const favourite = likes.indexOf(Math.max(...likes))
  return blogs.at(favourite)
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}