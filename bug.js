```javascript
const pipeline = [
  {
    $lookup: {
      from: "collectionB",
      localField: "_id",
      foreignField: "foreignKey",
      as: "relatedDocs",
    },
  },
  {
    $unwind: "$relatedDocs",
  },
  {
    $match: {
      "relatedDocs.someField": "someValue",
    },
  },
  {
    $group: {
      _id: "$_id",
      relatedDocs: {
        $push: "$relatedDocs",
      },
    },
  },
];

//This will cause issues if some documents from collectionA do not have any matching documents in collectionB.
//This is because the $unwind stage will remove documents that don't have relatedDocs array and $group will return empty array 
//which causes the following error

//Error: $group key must not contain an empty array
```