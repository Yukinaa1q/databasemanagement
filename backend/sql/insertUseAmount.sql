-- Step 1: Create a new table with the desired structure
CREATE TABLE Use_New (
    unique_code         CHAR(10)    NOT NULL,
    treatment_id        CHAR(10)    NOT NULL,
    amount              NUMBER, -- Add the new column
    CONSTRAINT use_key PRIMARY KEY(unique_code, treatment_id),
    FOREIGN KEY (unique_code) REFERENCES Medication(unique_code) ON DELETE CASCADE,
    FOREIGN KEY (treatment_id) REFERENCES Treatment(treatment_id) ON DELETE CASCADE
);


-- Step 3: Drop the existing table
DROP TABLE Use;

-- Step 4: Rename the new table to the original table name
ALTER TABLE Use_New RENAME TO Use;


INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000001', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000002', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000003', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000005', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000006', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000007', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000012', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000015', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000031', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000032', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000035', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000036', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000037', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000041', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000044', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000047', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000061', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000062', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000063', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000065', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000066', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000067', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000076', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000079', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000101', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000136', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000137', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000141', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000147', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000148', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000149', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000150', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000008', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000009', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000001', 'T000000010', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000001', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000002', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000003', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000004', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000012', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000013', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000014', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000031', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000033', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000035', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000045', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000047', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000061', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000062', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000063', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000064', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000076', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000077', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000078', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000101', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000136', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000138', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000140', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000148', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000149', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000150', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000008', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000009', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000002', 'T000000010', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000003', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000006', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000031', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000034', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000036', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000063', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000066', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000119', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000139', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000150', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000003', 'T000000010', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000016', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000017', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000018', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000019', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000049', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000056', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000080', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000082', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000084', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000086', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000120', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000004', 'T000000143', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000005', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000017', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000019', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000020', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000038', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000065', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000083', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000087', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000088', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000121', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000005', 'T000000008', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000004', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000020', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000036', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000038', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000064', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000089', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000121', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000006', 'T000000140', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000015', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000020', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000039', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000059', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000079', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000090', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000121', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000141', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000007', 'T000000150', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000004', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000016', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000036', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000040', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000049', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000064', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000080', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000106', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000008', 'T000000143', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000013', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000018', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000020', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000056', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000057', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000059', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000077', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000085', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000090', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000009', 'T000000106', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000010', 'T000000014', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000010', 'T000000059', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000010', 'T000000078', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000010', 'T000000107', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000010', 'T000000150', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000011', 'T000000014', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000011', 'T000000078', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000011', 'T000000107', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000011', 'T000000141', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000012', 'T000000059', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000012', 'T000000122', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000012', 'T000000132', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000012', 'T000000133', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000012', 'T000000134', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000013', 'T000000122', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000014', 'T000000122', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000014', 'T000000130', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000015', 'T000000123', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000015', 'T000000130', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000015', 'T000000134', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000016', 'T000000013', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000016', 'T000000077', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000016', 'T000000108', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000016', 'T000000116', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000017', 'T000000022', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000017', 'T000000092', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000017', 'T000000108', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000017', 'T000000116', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000018', 'T000000043', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000018', 'T000000108', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000018', 'T000000109', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000018', 'T000000110', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000019', 'T000000023', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000019', 'T000000024', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000019', 'T000000093', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000019', 'T000000102', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000019', 'T000000136', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000020', 'T000000102', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000021', 'T000000046', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000021', 'T000000110', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000021', 'T000000113', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000015', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000016', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000049', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000079', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000081', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000110', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000022', 'T000000142', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000017', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000018', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000022', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000042', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000084', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000085', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000092', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000023', 'T000000110', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000002', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000018', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000059', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000062', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000085', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000149', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000150', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000024', 'T000000009', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000025', 'T000000024', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000025', 'T000000026', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000025', 'T000000094', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000025', 'T000000103', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000025', 'T000000104', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000026', 'T000000040', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000026', 'T000000115', 17);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000027', 'T000000128', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000014', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000078', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000125', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000128', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000130', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000134', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000028', 'T000000141', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000029', 'T000000025', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000029', 'T000000075', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000029', 'T000000095', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000029', 'T000000125', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000029', 'T000000128', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000030', 'T000000058', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000030', 'T000000129', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000021', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000026', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000027', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000058', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000096', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000097', 11);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000031', 'T000000117', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000032', 'T000000043', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000032', 'T000000047', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000032', 'T000000049', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000021', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000023', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000026', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000033', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000091', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000093', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000033', 'T000000096', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000034', 'T000000006', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000034', 'T000000040', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000034', 'T000000066', 29);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000035', 'T000000017', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000035', 'T000000042', 5);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000035', 'T000000084', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000036', 'T000000018', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000036', 'T000000056', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000036', 'T000000086', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000002', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000006', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000011', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000062', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000066', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000068', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000149', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000037', 'T000000010', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000038', 'T000000028', 8);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000038', 'T000000058', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000038', 'T000000098', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000039', 'T000000011', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000039', 'T000000028', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000039', 'T000000069', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000039', 'T000000098', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000040', 'T000000002', 19);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000040', 'T000000035', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000040', 'T000000062', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000040', 'T000000137', 28);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000040', 'T000000149', 9);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000041', 'T000000026', 14);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000041', 'T000000096', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000041', 'T000000099', 7);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000042', 'T000000022', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000042', 'T000000029', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000042', 'T000000099', 12);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000043', 'T000000022', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000043', 'T000000060', 6);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000043', 'T000000092', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000044', 'T000000001', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000044', 'T000000061', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000044', 'T000000148', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000045', 'T000000048', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000045', 'T000000144', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000046', 'T000000016', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000046', 'T000000081', 24);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000046', 'T000000144', 18);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000046', 'T000000008', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000030', 30);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000031', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000100', 15);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000145', 13);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000147', 22);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000047', 'T000000008', 23);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000048', 'T000000146', 16);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000049', 'T000000030', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000049', 'T000000100', 27);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000049', 'T000000147', 25);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000049', 'T000000150', 26);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000050', 'T000000030', 20);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000050', 'T000000105', 10);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000050', 'T000000147', 21);
INSERT INTO Use (unique_code, treatment_id, amount) 
VALUES ('M000000050', 'T000000010', 9);

