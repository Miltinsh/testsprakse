const jsonData = {
    database: "TestApp",
    version: 19,
    encrypted: false,
    mode: "full",
    tables: [
      {
        name: "UserData",
        schema: [
          {column: "ID", value: "INTEGER PRIMARY KEY NOT NULL"},
          {column: "Name", value: "TEXT NOT NULL"},
          {column: "Surname", value: "TEXT NOT NULL"},
          {column: "DoB", value: "TEXT"},
          {column: "SSN", value: "INTEGER"},
        ]
      },
      {
        name: "Accounts",
        schema: [
          {column: "ID", value: "INTEGER PRIMARY KEY NOT NULL"},
          {column: "Email", value: "TEXT NOT NULL UNIQUE"},
          {column: "Pass", value: "TEXT NOT NULL"},
          {column: "DataID", value: "INTEGER NOT NULL REFERENCES UserData(ID) ON DELETE CASCADE"}, 
          //{constraint: "fk_dataid FOREIGN KEY(DataID) REFERENCES UserData(ID)"}
        ]
      }
    ]
  }

  export default jsonData;