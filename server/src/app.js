const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8081);

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/bastardcoward");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Succeeded");
});

var Action = require("../models/actions");
var ActionType = require("../models/action_types");
var Event = require("../models/events");
var Location = require("../models/locations");

// ACTIONS CRUD API

// Fetch actions based on location_id
app.get("/actions/:id/location_id", (req, res) => {
    console.error(req.params);
    var location_id = req.params.id;

    Action.find(
        { location_id: location_id },
        "type metadata location_id",
        { sort: { type: 1 } },
        function(error, actions) {
            if (error) {
                console.error(error);
            }
            res.send({
                actions: actions
            });
        }
    ).sort({ _id: -1 });
});

// Add new action
app.post("/actions", (req, res) => {
    var db = req.db;
    var location_id = req.body.location_id;
    var type = req.body.type;
    var metadata = req.body.metadata;
    var new_action = new Action({
        location_id: location_id,
        type: type,
        metadata: metadata
    });

    new_action.save(function(error) {
        if (error) {
            console.log(error);
        }
        res.send({
            success: true,
            message: "Action saved successfully!"
        });
    });
});

// Fetch all actions
app.get("/actions", (req, res) => {
    Action.find(
        {},
        "type metadata location_id",
        { sort: { type: 1 } },
        function(error, actions) {
            if (error) {
                console.error(error);
            }
            res.send({
                actions: actions
            });
        }
    ).sort({ _id: -1 });
});

// Fetch single action
app.get("/action/:id", (req, res) => {
    var db = req.db;

    Action.findById(req.params.id, "type metadata location_id", function(
        error,
        action
    ) {
        if (error) {
            console.error(error);
        }
        res.send(action);
    });
});

// Update an action
app.put("/actions/:id", (req, res) => {
    var db = req.db;
    Action.findById(req.params.id, "type metadata location_id", function(
        error,
        action
    ) {
        if (error) {
            console.error(error);
        }

        action.type = req.body.type;
        action.metadata = req.body.metadata;
        action.location_id = req.body.location_id;

        console.error(action);

        action.save(function(error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true
            });
        });
    });
});

// Delete an action
app.delete("/actions/:id", (req, res) => {
    var db = req.db;
    Action.remove(
        {
            _id: req.params.id
        },
        function(err, action) {
            if (err) res.send(err);
            res.send({
                success: true
            });
        }
    );
});

// ACTION TYPE CRUD API

// Find all action types
app.get("/action_types", (req, res) => {
    ActionType.find({}, "type description", { sort: { type: 1 } }, function(
        error,
        action_types
    ) {
        if (error) {
            console.error(error);
        }
        res.send({
            action_types: action_types
        });
    }).sort({ _id: -1 });
});

// Find action type by type name
app.get("/action_types/:query", (req, res) => {
    var db = req.db;
    var query = req.params.query;

    ActionType.find(
        { type: { $regex: query, $options: "i" } },
        "type description",
        function(error, action_type) {
            if (error) {
                console.error(error);
            }
            res.send(action_type);
        }
    );
});

// Add new action type
app.post("/action_types", (req, res) => {
    var db = req.db;
    var type = req.body.type;
    var description = req.body.description;
    var new_action_type = new ActionType({
        type: type,
        description: description
    });

    new_action_type.save(function(error) {
        if (error) {
            console.log(error);
        }
        res.send({
            success: true,
            message: "Action type saved successfully!"
        });
    });
});

// Fetch single action type
app.get("/action_type/:id", (req, res) => {
    var db = req.db;

    ActionType.findById(req.params.id, "type description", function(
        error,
        action
    ) {
        if (error) {
            console.error(error);
        }
        res.send(action);
    });
});

// Update an action
app.put("/action_types/:id", (req, res) => {
    var db = req.db;
    ActionType.findById(req.params.id, "type description", function(
        error,
        action
    ) {
        if (error) {
            console.error(error);
        }

        action.type = req.body.type;
        action.description = req.body.description;
        action.save(function(error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true
            });
        });
    });
});

// Delete an action type
app.delete("/action_types/:id", (req, res) => {
    var db = req.db;
    ActionType.remove(
        {
            _id: req.params.id
        },
        function(err, action) {
            if (err) res.send(err);
            res.send({
                success: true
            });
        }
    );
});

// LOCATION CRUD API

// Add new location
app.post("/locations", (req, res) => {
    var db = req.db;
    var location_id = req.body.location_id;
    var title = req.body.title;
    var description = req.body.description;
    var new_location = new Location({
        location_id: location_id,
        title: title,
        description: description
    });

    new_location.save(function(error) {
        if (error) {
            console.log(error);
        }
        res.send({
            success: true,
            message: "Location saved successfully!"
        });
    });
});

// Fetch all locations
app.get("/locations", (req, res) => {
    Location.find(
        {},
        "title description location_id",
        { sort: { location_id: 1 } },
        function(error, locations) {
            if (error) {
                console.error(error);
            }
            res.send({
                locations: locations
            });
        }
    ).sort({ _id: -1 });
});

// Fetch single location
app.get("/location/:id", (req, res) => {
    var db = req.db;

    Location.findById(req.params.id, "title description location_id", function(
        error,
        location
    ) {
        if (error) {
            console.error(error);
        }
        res.send(location);
    });
});

// Update a location
app.put("/locations/:id", (req, res) => {
    var db = req.db;
    Location.findById(req.params.id, "title description location_id", function(
        error,
        location
    ) {
        if (error) {
            console.error(error);
        }

        location.title = req.body.title;
        location.description = req.body.description;
        location.location_id = req.body.location_id;
        location.save(function(error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true
            });
        });
    });
});

// Delete an location
app.delete("/locations/:id", (req, res) => {
    var db = req.db;
    Location.remove(
        {
            _id: req.params.id
        },
        function(err, location) {
            if (err) res.send(err);
            res.send({
                success: true
            });
        }
    );
});

// Get max location_id
app.get("/locations/max_location_id/", (req, res) => {
    Location.find({}, "location_id", { sort: { location_id: -1 } }, function(
        error,
        locations
    ) {
        if (error) {
            console.error(error);
        }
        res.send({
            locations: locations
        });
    });
});

// Find location by location_id
app.get("/locations/:query", (req, res) => {
    var db = req.db;
    var query = req.params.query;

    Location.find(
        { location_id: { $regex: query, $options: "i" } },
        "title description location_id",
        function(error, location) {
            if (error) {
                console.error(error);
            }
            res.send(location);
        }
    );
});
