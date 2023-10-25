const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((sum, obj) => sum + obj.likes, 0)

module.exports = {
  dummy,
  totalLikes
}