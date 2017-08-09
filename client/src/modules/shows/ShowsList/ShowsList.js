import React from 'react';

const shows = [
    {
        "id": "test-movie",
        "category": "MOVIE",
        "name": "Test Movie",
        "downloadUrl": "mao"
    },
    {
        "id": "test-show",
        "category": "TVSHOW",
        "name": "Test Show",
        "downloadUrl": "lol"
    }
];

export default () => {
  const elements = shows.map((show) => (
    <div>
      {show.name}
    </div>
  ));

  return (
    <div>
      {elements}
    </div>
  );
};
