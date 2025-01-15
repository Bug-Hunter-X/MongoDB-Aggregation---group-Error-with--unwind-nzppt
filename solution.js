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
    $addFields: {
      hasRelatedDocs: { $gt: [{ $size: "$relatedDocs" }, 0] }
    }
  },
  {
    $match: {
      $expr: {
        $or: [
          { $eq: ["$hasRelatedDocs", true] },
          { $eq: ["$relatedDocs", []] }
        ]
      }
    }
  },
    {
    $unwind: {
      path: "$relatedDocs",
      preserveNullAndEmptyArrays: true
    }
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
```