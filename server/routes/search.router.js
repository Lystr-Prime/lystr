const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/:location/:startDate/:vehicleType', (req, res) => {
  const locationKeyword = req.params.location;
  const startDate = req.params.startDate;
  const vehicleType = req.params.vehicleType;

  const query = `

    SELECT "vehicle"."id" AS "vehicleId", "user"."username" AS "ownedBy", "type"."name" AS "type", "title", "make", "model", "year", "length", "capacity", "horsepower", "street", "city", "state", "zip", "description", "cabins", "heads", "daily_rate" AS "dailyRate",
    (select JSON_AGG("image_path") as "photos" from "photos" where "vehicle"."id" = "photos"."vehicle_id"),    
    (select JSON_AGG("date_available") as "availability" from "availability" where "vehicle"."id" = "availability"."vehicle_id" and "is_rented" = FALSE),
    (select JSON_AGG("name") as "features" from "features" join "vehicle_features" on "features"."id" = "vehicle_features"."feature_id" where "vehicle"."id" = "vehicle_features"."vehicle_id"),
    "coordinates"."lat" AS "lat", "coordinates"."lng" AS "lng"
    FROM "vehicle" JOIN "type" ON "vehicle"."type_id" = "type"."id" JOIN "user" ON "vehicle"."owned_by" = "user"."id" JOIN "coordinates" ON "coordinates"."vehicle_id" = "vehicle"."id";  
    ;`;

  pool
    .query(query)
    .then((result) => {
      // filter the list of all vehicles based on the search query
      const filtered = result.rows
        .filter((row) => row.availability !== null)
        .filter(
          (row) =>
            row.city.toLowerCase() === locationKeyword.toLowerCase() &&
            row.availability.includes(startDate) &&
            row.type.toLowerCase() === vehicleType.toLowerCase()
        );
      res.send(filtered);
    })

    // filter results here

    .catch((err) => {
      console.log(`Error making query`, err);
      res.sendStatus(500);
    });
});

router.get('/features', (req, res) => {
  const query = `SELECT * FROM "features";`;
  pool
    .query(query)
    .then((result) => res.send(result.rows))
    .catch((err) => {
      console.log(`Error making query `, err);
      res.sendStatus(500);
    });
});

// /**
//  * POST route template
//  */
// router.post("/", (req, res) => {
//   // POST route code here
// });

module.exports = router;
