const from = {
    id: Number,
    first_name: String,
    last_name: String,
    username: String
}

const chat = {
    id: Number,
    first_name: String,
    last_name: String,
    username: String,
    type: String
}

const Schema = {
    message_id: Number,
    from,
    chat, 
    date: Number,
    text: String
}