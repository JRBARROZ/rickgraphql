export const query = `query GetCharacters($page: Int! = 0, $filter: String = "") {
  characters(page: $page, filter: { name: $filter }) {
    info {
      count
      pages
    }
    results {
      id
      name
      status
      species
      gender
      image
      created
      location {
        name
      }
      origin {
        name
      }
      episode {
        name
        air_date
      }
    }
  }
}
`;