import React from 'react';

const available = [
    {
        "id": 2,
        "premiereDate": "2017-06-29T22:00:00.000Z",
        "number": 1,
        "season": {
            "id": 2,
            "frequency": "WEEKLY",
            "number": 1
        },
        "show": {
            "id": "test-show",
            "category": "TVSHOW",
            "name": "Test Show",
            "downloadUrl": "lol"
        }
    },
    {
        "id": 3,
        "premiereDate": "2017-07-06T22:00:00.000Z",
        "number": 2,
        "season": {
            "id": 2,
            "frequency": "WEEKLY",
            "number": 1
        },
        "show": {
            "id": "test-show",
            "category": "TVSHOW",
            "name": "Test Show",
            "downloadUrl": "lol"
        }
    },
    {
        "id": 4,
        "premiereDate": "2017-07-13T22:00:00.000Z",
        "number": 3,
        "season": {
            "id": 2,
            "frequency": "WEEKLY",
            "number": 1
        },
        "show": {
            "id": "test-show",
            "category": "TVSHOW",
            "name": "Test Show",
            "downloadUrl": "lol"
        }
    },
    {
        "id": 5,
        "premiereDate": "2017-07-20T22:00:00.000Z",
        "number": 4,
        "season": {
            "id": 2,
            "frequency": "WEEKLY",
            "number": 1
        },
        "show": {
            "id": "test-show",
            "category": "TVSHOW",
            "name": "Test Show",
            "downloadUrl": "lol"
        }
    },
    {
        "id": 6,
        "premiereDate": "2017-07-27T22:00:00.000Z",
        "number": 5,
        "season": {
            "id": 2,
            "frequency": "WEEKLY",
            "number": 1
        },
        "show": {
            "id": "test-show",
            "category": "TVSHOW",
            "name": "Test Show",
            "downloadUrl": "lol"
        }
    }
];

export default () => {
  const items = available.map((item) => (
    <div>
      {item.show.name}
    </div>
  ));

  return (
    <div>
      {items}
    </div>
  );
};
