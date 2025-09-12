-- Lab Test Definitions Bulk Insert - Chunk 6 (3 tests)
BEGIN;

INSERT INTO lab_test_definitions (test_name, department, cost, description, is_active, created_by) 
VALUES ('CULTURE & SENSIVITY', 'Microbiology', 400, '', true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe');

INSERT INTO lab_test_definitions (test_name, department, cost, description, is_active, created_by) 
VALUES ('BLOOD CULTURE & SENSIVITY', 'Microbiology', 1500, '', true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe');

INSERT INTO lab_test_definitions (test_name, department, cost, description, is_active, created_by) 
VALUES ('serum igm', 'Pathology', 2000, '', true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe');

COMMIT;
