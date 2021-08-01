db.createUser(
    {
        user: "vvcbuser",
        pwd: "examplepass",
        roles: [
            {
                role: "readWrite",
                db: "vvcb"
            }
        ]
    }
);