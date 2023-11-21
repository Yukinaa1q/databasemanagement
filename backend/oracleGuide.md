These are guide to run oracle.js

Set up oracle, run these file in Oracle sql developer :
    createUser.sql

Create a new connection with :
Name : c##btl2223
Password : btl2223

Then run in order :
    createTable.sql
    insertData.sql


You have to download 2 things for node to connect to sql: 
    Version 21.12.0.0.0
    https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html
    Then put the downloaded directory to the path "D:\\instantclient_21_12" 
    Then set the environment variable for the path D:\\instantclient_21_12
    (The path hard code in oracle.js you may change different directory if you want)

    Download The Visual Studio 2015, 2017, 2019, and 2022
    https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist?view=msvc-170


Now you can run in terminal and local host them:
    node "backend\oracle.js" 

You can used the web brower url or postman for testing : 

Get Patient Comorbidities:
    http://localhost:8000/patients/P000000001

    where P000000001 is the patient id

Get Patient Tests:
    http://localhost:8000/patients/P000000001/tests

    where P000000001 is the patient id

Get Patient Details:
    http://localhost:8000/patients/P000000001/details

    where P000000001 is the patient id

Post a new patient:
    http://localhost:8000/patients/

    json file: 
    {
        "patient_id": "P000000101",
        "patient_full_name": "Banh Tan Thuan",
        "identity_number": "079203333333",
        "phone": "0899513411",
        "gender": "M",
        "address": "269 Ba Hom Street, Ward 13, Dist 6, Ho Chi Minh City",
        "comorbidities": ["Asthma", "Diabetes"]
    }