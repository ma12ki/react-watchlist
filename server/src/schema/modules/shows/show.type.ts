export default `
# Show
type Show {
  _id: String
  name: String
  category: CATEGORY
  frequency: FREQUENCY
  premiereDate: String
  listed: Boolean
  tracked: Boolean
  episodes: [Episode]
}
`;
