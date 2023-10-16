export const dataToImport = {
    database: "db",
    version: 1,
    encrypted: false,
    mode: "full",
    tables: [
      {
        name: "Accounts",
        schema: [
          {column: "Name", value: "INTEGER NOT NULL"},
          {column: "Surname", value: "TEXT NOT NULL"},
          {column: "Name", value: "INTEGER NOT NULL"},
          {column: "Surname", value: "TEXT NOT NULL"},
          {column: "Name", value: "INTEGER NOT NULL"},
          {column: "Surname", value: "TEXT NOT NULL"},
        ]
      } 
    ]
  }