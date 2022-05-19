import { connectToDataBase } from "../../lib/db";
import { ObjectId } from "mongodb";

async function feedbackHandler(req, res) {
  const client = await connectToDataBase();
  const db = client.db();
  if (req.method === "PUT") {
    const data = req.body;
    const { workerID, author_id, firstName, lastName, feedback, rating, date } =
      data;
    if (!feedback && !rating) {
      res.status(422).json({ message: "No feedback and rating" });
      client.close();
      return;
    }
    //check worker exist
    const worker = await db.collection("worker").findOne({
      _id: ObjectId(workerID),
    });
    if (!worker) {
      client.close();
      res.status(422).json({ message: "No worker found" });
      return;
    }
    const query = [
      {
        $addFields: {
          feedback: {
            $cond: {
              if: {
                $eq: [
                  {
                    $concatArrays: [
                      "$feedback",
                      [
                        {
                          author: {
                            author_id: ObjectId(author_id),
                            firstName,
                            lastName,
                          },
                          rating,
                          date,
                          comment: feedback,
                        },
                      ],
                    ],
                  },
                  null,
                ],
              },
              then: [
                {
                  author: {
                    author_id: ObjectId(author_id),
                    firstName,
                    lastName,
                  },
                  rating,
                  date,
                  comment: feedback,
                },
              ],
              else: {
                $concatArrays: [
                  "$feedback",
                  [
                    {
                      author: {
                        author_id: ObjectId(author_id),
                        firstName,
                        lastName,
                      },
                      rating,
                      date,
                      comment: feedback,
                    },
                  ],
                ],
              },
            },
          },
        },
      },
      {
        $addFields: {
          "profile.totalRatingCount": {
            $cond: {
              if: { $isArray: "$feedback" },
              then: { $size: "$feedback" },
              else: 1,
            },
          },
        },
      },
      {
        $addFields: {
          "profile.averageRating": {
            $avg: "$feedback.rating",
          },
        },
      },
    ];
    try {
      const result = await db
        .collection("worker")
        .updateOne({ _id: ObjectId(workerID) }, query);
      console.log(result);
    } catch (err) {
      res.status(500).json({ message: err });
      client.close();
    }
    client.close();
    res.status(201).json({ message: "Feedback Created!" });
  }
  if (req.method === "GET") {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    /* console.log(page, limit, startIndex); */
    if (startIndex <= -1) {
      res.status(422).json({ message: "wrong query" });
      client.close();
      return;
    }
    try {
      const document = await db
        .collection("feedback")
        .find()
        .limit(limit)
        .skip(startIndex)
        .sort({ _id: -1 })
        .toArray();
      client.close();
      res.status(200).json({ feedback: document });
    } catch (err) {
      res.status(500).json({ message: err });
      console.log(err, "feedback GET trycatch");
      client.close();
    }

    /*     console.log(document,"data in api feedback") */
  }
}

export default feedbackHandler;
