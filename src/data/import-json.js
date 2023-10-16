const jsonData = {
    database: "TestApp",
    version: 3,
    encrypted: false,
    mode: "full",
    tables: [
      {
        name: "Accounts",
        schema: [
          {column: "ID", value: "INTEGER PRIMARY KEY NOT NULL"},
          {column: "Name", value: "TEXT NOT NULL"},
          {column: "Surname", value: "TEXT NOT NULL"},
          {column: "Email", value: "TEXT NOT NULL"},
          {column: "Pass", value: "TEXT NOT NULL"}
        ]
      } 
    ]
  }

  export default jsonData;