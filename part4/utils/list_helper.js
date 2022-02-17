// eslint-disable-next-line no-unused-vars
const dummy = blogs => 1

const totalLikes = blogs => {
  if (blogs.length) {
    return blogs.reduce((prevVal, currVal) => prevVal + currVal)
  } else return 0
}


module.exports = {
  dummy,
  totalLikes,
}