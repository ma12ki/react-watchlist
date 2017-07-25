import { frequencies } from '../../../../../common/dictionary/frequencies';

let frequencyEnum = `
# Show frequencies
enum FREQUENCY {
`;

frequencies
  .map((frequency) => frequency._id)
  .forEach((id) => {
    frequencyEnum += `${id}
    `;
  });

frequencyEnum += `}`;

export default frequencyEnum;
