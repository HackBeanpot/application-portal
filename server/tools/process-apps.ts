import path from 'path';
import { DecisionStatus } from '../../common/types';
import * as fs from 'fs';
import { connectToDatabase } from '../mongoDB';
import { parse } from 'csv-parse/sync';

// parse csv
function parseCsv<T>(csvFilePath: string, headers: string[] | boolean): T[] {
  const csvFileAbsolutePath = path.resolve(__dirname, csvFilePath);
  const fileContent = fs.readFileSync(csvFileAbsolutePath, { encoding: 'utf-8' });
  const options = {
    delimiter: ',',
    columns: headers,
  };
  return parse(fileContent, options);
}

async function main() {
  const emails: string[] = parseCsv<string>('./accepted-test.csv', ['email']);
  const { userDataCollection } = await connectToDatabase();

  for (let i = 0; i < emails.length; i++) {
    console.log(emails[i].email);
     userDataCollection.updateOne(
      { email: emails[i] },
      {
        $set: {
          decisionStatus: DecisionStatus.Admitted,
        },
      }
    );
  }
}

main();
