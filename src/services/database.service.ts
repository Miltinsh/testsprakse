import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import jsonData from "../data/import-json.js";
import bcrypt from 'bcryptjs'

const mSQLite = new SQLiteConnection(CapacitorSQLite);

let database: any;

export const initializeDatabase = async () => {
  console.log('connecting to DB');
  try {
    const ret = await mSQLite.checkConnectionsConsistency();

    if (!ret.result) {
      await mSQLite.createConnection(
        "TestApp",
        false,
        "no-encryption",
        1,
        false
      ).then((db: SQLiteDBConnection) => {
        database = db;
        console.log(db);
        database.queryOriginal = database.query; {
        }
        createTables();
        checkDBVersion();
      })
        .catch(() => {
          return false;
        });
    } else {
      await mSQLite.retrieveConnection("TestApp", false).then((db: SQLiteDBConnection) => {
        database = db;
        console.log(db);
        database.queryOriginal = database.query;
        database.query = function (query: string, placeholders: any[]) {
        }
        createTables();
        checkDBVersion();
      })
        .catch(() => {
          return false;
        });

    }
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const checkDBVersion = async () => {
  await database.open();
  console.log("checkDBVersion")
  return database.query(`PRAGMA user_version`)
    .then((result: any) => {
      if (
        result.values.length !== 1
        || jsonData.version === undefined
        || result.values[0].user_version === undefined
      ) {
        return true;
      }

      if (jsonData.version.toString() !== result.values[0].user_version.toString()) {
        console.log("New DB structure detected within JSON file");

        console.debug("loadJSON");
        return database.close().then(
          () => loadJSON()
        );
      }

      return false;
    })
    ;
}


export const loadJSON = async () => {
  await importJSON();

  return database.open()
    ;
};


export const importJSON = async () => {
  let result = await database.isExists('TestApp')
  console.log(result.result)
  if (result.result === false) {
    return
  }

  database.open()
  console.log("Loading DB table structure from JSON file, tables dropped");

  return database.open().then(
    (openResult: { result: boolean }) => {
      mSQLite.importFromJson(JSON.stringify(jsonData))
        .then(() => {
          console.debug("SQLite (importJSON): " + `PRAGMA user_version = "${jsonData.version}";`);
          return database.run(`PRAGMA user_version = "${jsonData.version}";`)
        })
        .catch(
          () => {
            console.debug("importFromJson failed");
            return
          })
        ;
    }
  );
};
const createTables = async () => {
  let result = await database.isDBOpen()

  if (result.result === false) {
    await database.open();
  }


  const createTableSQL = `
      CREATE TABLE IF NOT EXISTS Accounts (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Surname TEXT NOT NULL,
        Email TEXT NOT NULL UNIQUE,
        Pass TEXT NOT NULL
      );
    `;
  await database.run(createTableSQL);
}



export const logInAuth = async (email: string, password: string) => {
  try {
    console.log("Email: ", email, "|Password: ", password);

    if (!database) {
      console.error("Database not initialized!");
      return false;
    }

    let result = await database.isDBOpen()

    if (result.result === false) {
      await database.open();
    }

    const queryResult = await database.query('SELECT * FROM Accounts WHERE Email = ?;', [email])

    console.log("Query result: ", queryResult);

    if (!queryResult || !queryResult.values || queryResult.values.length === 0) {
      return null;
    } else {
      const userData = queryResult.values[0];

      // Compare the hashed password with the user's input
      const isPasswordValid = await bcrypt.compare(password, userData.Pass);

      if (isPasswordValid) {
        return userData; // Authentication successful
      } else {
        return null; // Authentication failed
      }
    }
  } catch (error) {
    console.error("Query failed with error:", error);
    return false;
  }
}

export const emailExists = async (email: string) => {
  let result = await database.isDBOpen();

  if (result.result === false) {
    await database.open();
  }

  const queryResult = await database.query('select Email from Accounts WHERE Email = ?;', [email]);
  if (!queryResult || !queryResult.values) {
    console.error("Query result is not as expected:", queryResult);
    return false; // or handle the situation accordingly
  }
  return queryResult.values.length > 0;

};

console.log('connecting to DB');
export const resetPassword = async (email: string, password: string) => {
  let result = await database.isDBOpen()

  if (result.result === false) {
    await database.open();
  }

  try {
    console.log("Password: ", password.toString(), "Email: ", email.toString());
    return await database.run(
      `
        UPDATE Accounts
        SET Pass = ?
        WHERE Email = ?;
        `,
      [
        password.toString(),
        email.toString(),
      ]
    );
  } catch (error: any) {
    if (error.message && error.message.includes('UNIQUE constraint failed: Accounts.Email')) {
      // The email is already in use.
      throw new Error('Email is already in use!');
    } else {
      // Some other error occurred.
      throw error;
    }
  }

}



// INSER USER
console.log('connecting to DB');
export const insertUser = async (name: string, surname: string, email: string, password: string) => {
  let result = await database.isDBOpen()

  if (result.result === false) {
    await database.open();
  }

  try {
    return await database.run(
      `
        INSERT INTO
        Accounts (
            Name,
            Surname,
            Email,
            Pass
          )
        VALUES(?,?,?,?)
        `,
      [
        name.toString(),
        surname.toString(),
        email.toString(),
        password.toString(),
      ]
    );
  } catch (error: any) {
    if (error.message && error.message.includes('UNIQUE constraint failed: Accounts.Email')) {
      // The email is already in use.
      throw new Error('Email is already in use!');
    } else {
      // Some other error occurred.
      throw error;
    }
  }

}
