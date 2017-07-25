export default `
# Episode
type Episode {
  _id: String
  season: Int
  episode: Int
  premiereDate: String
  watched: Boolean
  show: Show
}
`;
