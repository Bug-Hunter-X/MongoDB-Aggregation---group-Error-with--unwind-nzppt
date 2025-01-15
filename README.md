# MongoDB Aggregation Error: $group key must not contain an empty array

This repository demonstrates a common error encountered when using the `$unwind` and `$group` stages together in a MongoDB aggregation pipeline.  The error occurs when documents processed by `$unwind` result in empty arrays, causing issues in the `$group` stage.

The `bug.js` file shows the code that produces the error. The `solution.js` file provides a solution that handles cases where no related documents are found.

## Problem
The `$unwind` stage in MongoDB will remove documents that don't have an array of elements to unwind. If a document lacks related documents after the `$lookup`, it's removed entirely.
When this happens and the pipeline includes a `$group` stage,  the `$group` stage's `_id` field can become an empty array which MongoDB doesn't permit, hence throwing the error: `$group key must not contain an empty array`.

## Solution
The solution involves adding a `$lookup` stage to check for the existence of the related collection before applying the `$unwind` operator.