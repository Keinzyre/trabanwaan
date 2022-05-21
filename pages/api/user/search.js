import { connectToDataBase } from "../../../lib/db";

async function searchWorkerHandler(req, res) {
  console.log(req.query, "req,query");
  if (req.method === "GET") {
    const keyword = req.query.keyword;
    const service = req.query.service;
    const area = req.query.area;
    const rating = parseInt(req.query.rating);
    console.log(
      keyword,
      "keyword",
      service.split(","),
      "service",
      area,
      "area",
      rating,
      "rating"
    );

    if (!keyword && !service && !area && !rating) {
      res.status(422).json({ message: "No filter found" });
      return;
    }
    let filters = [];

    if (keyword) {
      const includeKeyword = {
        text: {
          query: keyword,
          path: [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "profile.introduction",
            "profile.service",
            "profile.startingCost",
            "profile.area",
            "profile.totalRating",
          ],
        },
      };
      filters = [...filters, includeKeyword];
    }
    if (service) {
      const includeService = {
        text: {
          query: service.split(","),
          path: "profile.service",
        },
      };
      filters = [...filters, includeService];
    }
    if (area) {
      const includeArea = {
        text: {
          query: [area],
          path: "profile.area",
        },
      };
      filters = [...filters, includeArea];
    }
    if (rating) {
      let checkRating = rating;
      if (rating === 5) {
        checkRating = rating - 0.5;
      }
      /* console.log(checkRating, "checkrating must be 4.5"); */
      const includeRating = {
        range: {
          gt: checkRating,
          path: "profile.averageRating",
        },
      };
      filters = [...filters, includeRating];
    }
    const pipeline = [
      {
        $search: {
          index: "searchWorker",
          compound: {
            must: filters,
            mustNot: [{
              "text":{
                query: "client",
                path: "accountType"
              }
            }]
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          "profile.avatar": 1,
          "profile.introduction": 1,
          "profile.service": 1,
          "profile.startingCost": 1,
          "profile.area": 1,
          "profile.totalRatingCount": 1,
          "profile.averageRating": 1,
        },
      },
    ];
    console.log(filters, "filter query");
    /*   res.status(200).json({ message: "ok" }); */

    const client = await connectToDataBase();
    const db = client.db();
    try {
      const searchResult = await db
        .collection("worker")
        .aggregate(pipeline)
        .toArray();
      client.close();
      console.log(searchResult, "searchResult /api/search");
      res.status(200).json({ searchResult });
    } catch (err) {
      console.log(err, "user GET trycatch");
      client.close();
      res.status(500).json({ message: err });
    }
  }
}

export default searchWorkerHandler;
