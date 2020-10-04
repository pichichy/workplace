//===============================
// PUERTO
//===============================

process.env.PORT = process.env.PORT || 3001;

//===============================
// AMBIENTE
//===============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===============================
// POSTGRES
//===============================
PGHOST = '35.232.146.76';
PGUSER = process.env.USER || 'postgres';
PGDATABASE = process.env.USER || 'postgres';
PGPASSWORD = 'admin';
PGPORT = 5432;

//===============================
// DATOS
//===============================
NAMEBUCKET = 'wp-fal-files';

PROJECTID = 'hello-gcp-285220';
KEYFILENAME = "../config/hello-gcp-285220-eca34c8cae98.json";

//===============================
// CRYPTO KEY
//===============================
KEY = '12345678123456781234567812345678';