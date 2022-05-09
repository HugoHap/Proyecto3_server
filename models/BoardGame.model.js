const { Schema, model } = require("mongoose");

const boardGameSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        gameImg: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["ORIGINAL", "RENT"],
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        players: {
            min: {
                type: Number,
            },
            max: {
                type: Number
            },
        },
        likes: {
            type: Number,
            default: 0
        },
        dislike: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const BoardGame = model("BoardGame", boardGameSchema);

module.exports = BoardGame;