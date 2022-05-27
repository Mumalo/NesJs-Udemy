import {rm} from 'fs/promises'
import {join} from 'path'
import { getConnection } from "typeorm";

/*
  Runs before all the tests
 */
global.beforeEach(async () => {
    try {
        console.log("Removing test db")
        await rm(join(__dirname, '..', 'db.test.sqlite'))
    } catch (ignored) {
    }
})

/*
  tell the orm to not open connections after each test
  this represents a connection to the file
 */
global.afterEach(async () => {
    const conn = getConnection();
    await conn.close()
})
