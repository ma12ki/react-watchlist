import { categories } from '../../../../../common/dictionary/categories';

let categoryEnum = `
# Show categories
enum CATEGORY {
`;

categories
  .map((category) => category._id)
  .forEach((id) => {
    categoryEnum += `${id}
    `;
  });

categoryEnum += `}`;

export default categoryEnum;
