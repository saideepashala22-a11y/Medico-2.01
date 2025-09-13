--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (84ade85)
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.users DISABLE TRIGGER ALL;

INSERT INTO public.users VALUES ('883c712e-8b31-46cd-b46b-9b11f0a41cbe', 'admin', '$2b$10$rs021g6dxc6DYlpBSn0OLOpPjG79yQda6KzVl.mde5uaDbp4rYgta', 'doctor', 'Hospital Administrator', 'admin@hospital.com', '+1234567890', 'Administration', 'ADM001', true, false, true, NULL, NULL, '2025-09-12 16:27:06.762502');
INSERT INTO public.users VALUES ('2116a913-c912-4c4d-8bcc-71fd24a8a415', 'doctor_michel_1757695503283', 'display_only', 'doctor', 'Michel', NULL, NULL, NULL, NULL, false, true, true, NULL, NULL, '2025-09-12 16:45:03.546652');


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.activities DISABLE TRIGGER ALL;

INSERT INTO public.activities VALUES ('dd66c555-678c-4da9-8ef6-adadaf4b4a16', 'patient_registered', 'New patient registered', 'Chintu (MRU25-0001) has been registered', 'b29807c6-4632-4bf7-9825-27f39f83d051', 'patient', '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 16:45:40.635416');


ALTER TABLE public.activities ENABLE TRIGGER ALL;

--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.patients DISABLE TRIGGER ALL;



ALTER TABLE public.patients ENABLE TRIGGER ALL;

--
-- Data for Name: consultations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.consultations DISABLE TRIGGER ALL;



ALTER TABLE public.consultations ENABLE TRIGGER ALL;

--
-- Data for Name: discharge_summaries; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.discharge_summaries DISABLE TRIGGER ALL;



ALTER TABLE public.discharge_summaries ENABLE TRIGGER ALL;

--
-- Data for Name: hospital_settings; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.hospital_settings DISABLE TRIGGER ALL;

INSERT INTO public.hospital_settings VALUES ('ea5d1586-e438-42de-bd11-3d784f3ac45d', ' KARNATAKA HOSPITAL', '', '123 Medical District, Healthcare City, State - 123456', '+91-1234567890', '', '', NULL, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 16:27:44.326312', '2025-09-13 02:11:50.162');


ALTER TABLE public.hospital_settings ENABLE TRIGGER ALL;

--
-- Data for Name: lab_test_definitions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.lab_test_definitions DISABLE TRIGGER ALL;

INSERT INTO public.lab_test_definitions VALUES ('810713a7-01a8-47b5-b65a-8d6b10d821da', '24 Hrs URINARY PROTEINS', 'Biochemistry', 700.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('efee91b5-39f4-4fe2-bffd-2faa1167483b', 'ABSOLUTE EOSINOPHIL COUNT(AEC)', 'Pathology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('6998f4fe-e9e3-4aab-90ef-6ce54eb6e4a8', 'AFB (Acid Fast Bacilli) CULTURE', 'Microbiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('98a60e92-78b3-4e6d-a0fd-9e2fcfc23d93', 'ALBUMIN', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('a8d4a355-38f5-45dc-99ad-3925c2d28740', 'ANTENATAL PROFILE(ANC PROFILE)', 'Pathology', 1.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('2dd72b1e-180b-4075-8458-6540cd46f258', 'ANTI HEPATITIS A VIRUS - IGM', 'Pathology', 120.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('4e68d74d-d63b-487a-ae05-dbe01d96a19d', 'APTT', 'Pathology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('b5476363-d949-4b0f-8fa2-48c825738b8a', 'ARTHRITIS PROFILE', 'Pathology', 2500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('49c6e49a-28de-42d1-b8e0-c08090289a2f', 'ASO TITRE', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('f47a4342-8b6a-4db2-80c9-3f0268231e5f', 'ASO/R.A/C.R.P', 'Pathology', 900.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('81e33432-73e2-414e-b244-504e4877dfca', 'Anti Mullerian Harmone (AMH)', 'Pathology', 2000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('59b93fe4-653c-4422-ba92-ab13d7904f94', 'Anti Phospolipid Anti bodies  IgG & IgM', 'Pathology', 1300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('d3a0003a-ede5-4e28-a06a-e03c941f73bd', 'BGNNHNHNHN', 'Pathology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('0937cbcc-b739-4fb8-934d-0f270ec23fbc', 'BICARBONATE', 'Biochemistry', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('40b975c3-0631-46ab-b081-2e965c3eb657', 'BILE SALT & BILE PIGMENTS', 'Pathology', 50.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('d439e2be-837f-4bea-aee1-aa9a669752c0', 'BLOOD  HCG', 'Biochemistry', 1200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('d21cdaa8-cf80-4486-8c59-361634d1c8ab', 'BLOOD CULTURE & SENSIVITY', 'Microbiology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('1829801c-7793-46cc-ba0b-9c44e5a5f706', 'BLOOD GROUP', 'Hematology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('a41eb31a-a684-47a2-8a73-5d3012749086', 'BLOOD KETONES', 'Biochemistry', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('a811c66c-8a1f-4e18-a6a8-4268ea9b8817', 'BLOOD UREA', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('bb6e2ef8-b95b-483a-9a51-9aa512dfd5f0', 'BLOOD UREA NITROGEN (BUN)', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('649a5b8b-b440-4477-b23b-fd40708a64f1', 'BT CT', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('0325a384-10ec-4df3-9d64-77da75a3a29f', 'C-PEPTIDE', 'Pathology', 900.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('9d36c670-a767-40db-99a0-d3f8d1e48a38', 'C-REACTIVE PROTEIN', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('f7f2fafa-0960-4897-88b0-f8de63a8a37d', 'CBP', 'Hematology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('9011bc68-ed63-410e-a404-97de1cea5258', 'CHIKUNGUNYA', 'Immunology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('122c431c-d941-4cf3-bab7-e54f5fd95957', 'CK-MB', 'Biochemistry', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('3ce6b9fc-04bd-4bc9-86ba-2152b067eab6', 'CK-NAC', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('d66d8d8f-5c47-49a7-a0fe-53ba28ce2551', 'COMPLETE BLOOD COUNT', 'Hematology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('d6bf2a01-43b6-47b4-aed2-d39dfb03ccaf', 'CREATININE KINASE', 'Biochemistry', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('f32c680e-72fb-4b06-a55a-26da9c96879c', 'CRP', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('a214d411-4b4b-4c7d-9aa1-586c1f5a181a', 'CT SCAN ABDOMEN', 'Radiology', 1800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('3871b404-e2c9-4cb3-9233-eb8fb72bd210', 'CT SCAN HEAD', 'Radiology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('62c9c779-3efa-41e8-bf3e-8ed51d5f1bbd', 'CUE', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('e9920371-70b8-4489-aaa1-f141a04cd354', 'CULTURE & SENSIVITY', 'Microbiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('221894b2-9019-4a01-bf97-adc30df018bd', 'CULTURE FOR CHLAMYDIA', 'Microbiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('99a7ffc2-36e3-4d80-954c-5a3ee4909662', 'D-DIMER', 'Pathology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('f117dc92-ae14-4244-acb1-da6f670f4471', 'DENGUE IgG, IgM & NS1', 'Immunology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('91326c5c-5d68-4b57-ab49-f2024584a674', 'ECG', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('606a2e71-19f8-4bce-b495-938d8e26a7fe', 'ECHOCARDIOGRAPHY', 'Radiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('8d911e23-a566-4aad-97b7-8316b2c77a29', 'ESR', 'Hematology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('b91a4cc8-047c-441a-9d53-86e46f2f8859', 'ESTROGEN', 'Endocrinology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('27704f89-762a-45ba-b5ef-8b354fbd619f', 'FBS', 'Pathology', 50.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('758668a5-7d4d-4805-8dbc-85f7bfa096a4', 'FBS & PLBS', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('52796976-67a6-4960-a741-3c063aff2c48', 'FERRITIN', 'Pathology', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('ab995b81-166c-4f97-b05d-a0d9c2562b35', 'FSH', 'Endocrinology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('385089bf-f203-497b-8d95-76e7a0d33e17', 'FT3 FT4', 'Endocrinology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('4dc6ae5d-b54a-4126-b5ea-52f3e5af2989', 'GAMMA G.T.', 'Pathology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('9770482a-3c0f-48f0-8bcc-020f8b44c5ee', 'GLUCOSE TOLERANCE TEST(GTT)', 'Biochemistry', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('5563265d-e662-4082-9234-7cd8005fd9ca', 'GLYCOSYLATED HEMOGLOBIN(GHbA1c)', 'Pathology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('ccaecdb9-7af7-43c9-8bc8-6af17bc6ab80', 'GRAM STAIN', 'Microbiology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('7676de12-b073-4f62-bdfb-b96b8bca3f40', 'HAEMOGLOBIN', 'Hematology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('f0b6b39b-29f9-46e8-86f6-d5e677f84e73', 'HAEMOGRAM', 'Hematology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('9dc33a8e-4a04-4835-85e7-fb145d2aea7b', 'HBsAg', 'Immunology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('2f978a9b-473e-40db-81c7-ecb0da57499d', 'HCV', 'Immunology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('8bc594c0-1569-4c07-8184-cf844fcc5b06', 'HIV', 'Immunology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('b33189d9-f6e9-4a81-8ef9-9e0b04125968', 'HIV WITH BLOOD GROUP', 'Biochemistry', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('5ef4abc6-9e5e-4f4b-8f9c-fde1acaf6592', 'HOMOCYSTINE', 'Pathology', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('8096b295-9179-4f78-95db-1534776c6a4a', 'HS1 IgG IgM', 'Pathology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('8acbb472-55ca-4764-9008-4c0541c545ac', 'HbA1c', 'Pathology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:43.752295', '2025-09-12 17:22:43.752295');
INSERT INTO public.lab_test_definitions VALUES ('b45490ec-0e21-4287-aa60-8f34cd15b60e', 'IRON PROFILE', 'Pathology', 1400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('58393009-d448-4ae0-ae84-1737bab3e829', 'LDH', 'Pathology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('8989380f-2d1f-456b-9586-d3df891173b8', 'LH', 'Endocrinology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('e500b43d-0aa0-4cb6-aa33-29753ad16bd9', 'LH TEST', 'Endocrinology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('a0e85780-d741-42f0-8ad7-aa79d0fd5028', 'LIPID PROFILE TEST', 'Biochemistry', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('9480a4a8-e458-4887-8b29-aee027603c77', 'LIVER FUNCTION TEST(LFT)', 'Pathology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('029844a1-50aa-4759-8bb7-79bb7798eabf', 'MALARIAL PARASITE (PV & PF)', 'Immunology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('04c2a25c-bea8-477e-8d1c-9f5adee9d31a', 'MALARIAL PARASITE (SMEAR FOR MP)', 'Hematology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('db4dc072-aed5-4654-ae8b-689c79b49dfd', 'MANTOUX TEST', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('1ec667a6-ea22-4e62-8223-27e439c7ea3f', 'MRI BRAIN', 'Radiology', 2500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('0ff21ab5-1ba8-48a0-baba-cbb6122d43f1', 'MRI SPINE', 'Radiology', 2500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('175828ea-0f72-4f37-bb99-b71c97d9b5f5', 'MYOGLOBIN', 'Pathology', 850.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('4d49038b-d89e-411b-95d7-ee3ce08bb4b1', 'PCV (Packed Cell Volume)', 'Hematology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('8f4b57da-0672-49df-9a6e-d6b8a37b6ce4', 'PERIPHERAL SMEAR', 'Hematology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('92dc6e5b-2309-49bb-8ea6-210b4922ff21', 'PLATELET COUNT', 'Hematology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('4516d6c6-a309-4b95-99c1-9619b937a515', 'POST LUNCH BLOOD SUGAR', 'Biochemistry', 70.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('0507d88f-d43a-4fef-ab4b-05b517663a27', 'PROGESTERONE', 'Endocrinology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('5a45c0f7-b849-4495-ab6f-37cb72754e26', 'PROLACTIN', 'Endocrinology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('2ad75a6e-24cb-4ff1-b893-afb99a9b9e2f', 'PT', 'Pathology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('652274ef-4534-4ecf-bf81-9fd6221d79f3', 'PT INR', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('7efdad44-e94b-41b7-aabc-c39b1cded688', 'RA FACTOR', 'Pathology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('6e163a7b-a33a-4324-a142-d8a6719081a7', 'RBS', 'Pathology', 50.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('92e4e594-0360-4337-93b0-da7259c4f887', 'REC (Reticulocyte Count)', 'Pathology', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('592b102a-e0b4-4c0a-ba86-61e351c7dbe2', 'RFT', 'Pathology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('423484d8-2905-4094-b090-8d0925974abe', 'RFT, LFT, CRP, S.ELECTRO,LIPID(COMPLETE PROFILE)', 'Biochemistry', 1800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('9318d473-1a52-4c1b-8255-cc3a4bd8e4ce', 'RUBELLA  IgG.', 'Pathology', 0.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('e06dbe04-94cd-4483-b050-b929c60313a2', 'RUBELLA VIRUS  - IgG', 'Pathology', 0.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('214816c2-ba86-46f4-b645-c17f2bc2203e', 'S.G.O.T.', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('61ec68bc-330f-424c-abea-a025abe17302', 'S.G.P.T.', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('62c9d755-0ef2-4418-86c7-e7bf9b911cf7', 'SEMEN ANALYSIS', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('cb8bc496-cb73-4734-b701-1d27499a1194', 'SERUM AMYLASE', 'Biochemistry', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:34.133193', '2025-09-12 17:20:34.133193');
INSERT INTO public.lab_test_definitions VALUES ('5c3561a0-047a-48e6-aee7-322268b92c25', 'SERUM BILIRUBIN', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('50dcd013-98b7-4fb0-90cd-cf4a115a338e', 'SERUM CALCIUM', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:20:56.316102', '2025-09-12 17:20:56.316102');
INSERT INTO public.lab_test_definitions VALUES ('9102be63-003e-46bd-aca4-30f962b68740', 'SERUM COLONOSTRASE', 'Biochemistry', 1200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('8a2404b2-d57f-4026-9413-c2abab136262', 'SERUM CPK', 'Biochemistry', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('f74ef77d-6c34-4cab-ac2f-d0d80c308550', 'SERUM CREATININE', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('3972cdee-e7c1-4e95-8b46-2a9ebb5f74f1', 'SERUM ELECTROLYTES', 'Biochemistry', 700.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('73dfeb9c-e830-47ec-8ce6-fefb0162cc9f', 'SERUM HAPTO GLOBIN', 'Biochemistry', 1800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('1e8c6e28-1f2a-4b79-ac43-37dfd3d02421', 'SERUM INSULIN', 'Biochemistry', 700.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('2f988491-145b-47e4-8943-18854e57b419', 'SERUM IRON', 'Biochemistry', 650.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:22:50.877704', '2025-09-12 17:22:50.877704');
INSERT INTO public.lab_test_definitions VALUES ('6570a921-2835-43d8-880f-45d2fe7de1ec', 'SERUM IgE', 'Biochemistry', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('ff73ae1d-131e-4359-8c7e-72a46451bdee', 'SERUM PHOSPHORUS', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('9bc0e4a4-434a-4a0b-a9d1-133bd6dbe10f', 'SERUM POTASSIUM', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('15a81a9c-cbbc-49d4-ab96-10a7881ad047', 'SERUM PROCALSOTONIN', 'Biochemistry', 2500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('ed7fbffb-b8ac-44e8-a36f-db1f21bbd3ad', 'SERUM PROTEINS', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('cb3c8aa1-0ce7-4f33-84ef-384ead518816', 'SERUM SODIUM', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('45e4b178-1fc0-478b-8adb-d549eb0f0dd9', 'SERUM TRIGLYCERIDES', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('a9a893b1-64da-43a8-8690-f854c11b6fbb', 'SERUM URIC ACID', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('62a05b4b-b0b9-40c9-a16b-904c8079089f', 'SMEAR FOR FUNGAL ELEMENTS', 'Hematology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('8ccaa0b6-c3af-4836-bfb5-95d69c225a4e', 'SPUTUM CULTURE & SENSIVITY', 'Microbiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('85d09ad7-9c6c-471c-9fc4-7d186e7d5555', 'SPUTUM FOR A.F.B', 'Microbiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('a341b938-d75a-4e12-8561-f3b3aa14f3ab', 'SPUTUM FOR GRAM STAIN', 'Microbiology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('91c3e76e-d50d-4f10-9605-e07822df6eee', 'SPUTUM FOR MALIGNANT CELLS', 'Microbiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('c55d827b-2d67-4eaa-99a9-cf2238937ea2', 'STONE ANALYSIS', 'Pathology', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('a553e3e3-5659-48ab-b208-088ca1fa742c', 'STOOL EXAMINATION', 'Pathology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:23:49.762589', '2025-09-12 17:23:49.762589');
INSERT INTO public.lab_test_definitions VALUES ('6a059944-f39f-4a74-9daa-5db1e8d0003a', 'STOOL FOR CYST & PARASITES', 'Microbiology', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('8d6b335d-effd-4361-9015-5a0d7c5603f1', 'STOOL FOR OCCULT BLOOD', 'Microbiology', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('ccacb81f-91fc-4790-9d5f-8c3ff0e889dc', 'STOOL FOR REDUCING SUBSTANCE', 'Microbiology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('c97e5644-2130-40e3-a154-c25733d85741', 'STRESS ECG', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('cc8e51dd-a00a-4c6a-b35d-9d17c6340a99', 'T3', 'Endocrinology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('426b1217-f548-4ec7-8f84-3bae38ac7cc8', 'T4', 'Endocrinology', 250.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('0e60ab0a-546d-476a-a6ce-5bdc278b6246', 'TESTOSTERONE', 'Endocrinology', 750.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('52417678-eab3-4b2f-8d10-d924f5b4124e', 'THYROID PROFILE (T3 T4 & TSH)', 'Endocrinology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('3f6e26b4-4126-45a4-b476-ad4a7a8ab63c', 'TORCH TEST', 'Immunology', 2500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('dd1c5e96-7b3d-4035-9f64-95f17b26fe1f', 'TOTAL CHOLESTEROL', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('5767854f-f006-4274-9f25-abd90c70afae', 'TOTAL PROTEINS', 'Biochemistry', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('685ec777-fb84-488a-879d-022e8661b262', 'TROP I', 'Pathology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('cfa39141-973d-485b-97d7-76a08114c60b', 'TROP T', 'Pathology', 1500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('77317a66-39ae-4f7b-86ab-3fd7ccd4244d', 'TSH', 'Endocrinology', 300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('d036a6b5-b499-4aec-9b9e-4fb2ff19e08d', 'ULTRA SOUND ABDOMEN & PELVIS', 'Radiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('e32b71dd-a36f-4282-a00d-5e35826451b9', 'ULTRA SOUND ANTENATAL (OBSTERTIC)', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('57d80c39-2644-4563-a52a-7416edeb8ceb', 'ULTRA SOUND BREAST - BOTH', 'Radiology', 900.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('7f55fc24-d3b2-4505-af79-0bda73187e81', 'ULTRA SOUND BREAST - SINGLE', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('a8cc4a22-1e96-4c71-bf11-4a39174129a7', 'ULTRA SOUND DOPPLER STUDY', 'Radiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('3d76f9e2-3fba-4685-8b2a-3839612d73c6', 'ULTRA SOUND KUB', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('af2172ac-ef8f-4545-aefb-023262285d58', 'ULTRA SOUND NECK', 'Radiology', 650.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('12129a17-6458-4fbc-a87d-c0797020269b', 'ULTRA SOUND OBSTETRIC SCAN', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('2d82bc6f-e909-4a10-afa2-9633de8612aa', 'ULTRA SOUND PELVIS', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('a352ff26-c671-44f7-8c00-88d09ca426a8', 'ULTRA SOUND PELVIS FOR PREGNANCY', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('a0454fa2-ed8d-4762-ba2b-8e9a412a7125', 'ULTRA SOUND PELVIS SCAN', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('5084e0a0-fb69-49c6-bbd0-1c6048a8e3a2', 'ULTRA SOUND SCROTUM', 'Radiology', 700.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('7e1369a6-0dd9-4642-8991-f265d3e3da1c', 'ULTRA SOUND THYROID', 'Radiology', 650.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('d064735c-fbf2-44e3-9577-d52ce10d2986', 'ULTRA SOUND THYROID SCAN', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('5239a1a3-da0d-4216-be22-6d1ea80157e4', 'ULTRA SOUND WHOLE ABDOMEN', 'Radiology', 600.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('fb3f6b54-8c9e-4759-ab31-5484bd4321d5', 'ULTRASOUND FOLLICULAR STUDY', 'Radiology', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('92f5070f-dd0c-4c06-81cb-066a57a48d14', 'ULTRASOUND INTERVAL GROWTH (IIIrd TRIMESTER)-BPP', 'Radiology', 1000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('ddcd78e8-0a45-4aa9-910c-035413801fbb', 'ULTRASOUND SCAN OF ABDOMEN ( MALE )', 'Radiology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('28eb8212-d984-416b-9710-0b1433817e54', 'ULTRASOUND TIFFA SCAN', 'Radiology', 800.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('34263145-4342-4aa6-bc85-625638af0666', 'ULTRASOUND TRANS VAGINAL SCAN(Ist TRIMESTER) REPORT', 'Radiology', 700.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('3a68c971-d0df-48d5-bdaa-1771f2a88e82', 'URINARY PROTEIN 24 HRS', 'Biochemistry', 50.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('61c877d6-9cc1-4654-9e27-b4e4e823e20d', 'URINE  NORMAL', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('635ab7d7-5951-4cb1-a54a-3b5b8c1b5f15', 'URINE CULTURE & SENSIVITY', 'Microbiology', 750.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:45.909386', '2025-09-12 17:21:45.909386');
INSERT INTO public.lab_test_definitions VALUES ('601451b4-8b3e-44bb-ab36-d2da96df9806', 'URINE FOR KETONE BODIES', 'Pathology', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:21.847682', '2025-09-12 17:29:21.847682');
INSERT INTO public.lab_test_definitions VALUES ('4feebeb0-a36c-4c21-b705-4548f01136aa', 'URINE FOR MICROALBUMIN', 'Pathology', 450.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('c9dc1a58-3a06-4638-a80d-a0d9cf580ee7', 'URINE FOR PREGNANCY TEST', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:21:18.543535', '2025-09-12 17:21:18.543535');
INSERT INTO public.lab_test_definitions VALUES ('2533a1e6-3230-4897-9f26-2095d222f468', 'VDRL', 'Immunology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('3b9e4ec5-1cd3-4b7b-8a08-af0c32d01f78', 'VITAMIN - D', 'Pathology', 1.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('7bda3959-f18b-4ff2-8b79-0648c4c4348a', 'VITAMIN B-12', 'Pathology', 1200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:21.272483', '2025-09-12 17:25:21.272483');
INSERT INTO public.lab_test_definitions VALUES ('567f85fb-13f2-4a77-8b35-2c9129edba2c', 'VITAMIN D3', 'Pathology', 650.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('c1758748-1b90-4590-9707-d37256c79f30', 'WIDAL TEST', 'Immunology', 150.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('a1eddccb-c792-473c-b726-c6ee8e51bc9c', 'WIDAL TEST WITH MP', 'Immunology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('c3b785e4-c575-4933-acee-0e8f80444a51', 'WIDAL TEST WITH MP,BG,BILIRUBIN,CRP,RBS', 'Biochemistry', 950.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('769d96f2-aa4e-412c-83c2-7414bf6771e8', 'WIDAL TEST WITH MP,PC,RBS', 'Immunology', 350.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');
INSERT INTO public.lab_test_definitions VALUES ('ed1e487a-bf21-4bad-b7f9-fda0324c114c', 'X-RAY ABDOMEN ERRECT', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('bc20cb5d-30b3-4f07-a9cc-65f76f0589b0', 'X-RAY ANKLE JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('51a830fa-5ed0-4adf-a657-5b742b08d902', 'X-RAY ANKLE JOINT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('303bc174-acfe-411d-a390-1a9654965aa3', 'X-RAY ANKLE JOINT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:27:41.773596', '2025-09-12 17:27:41.773596');
INSERT INTO public.lab_test_definitions VALUES ('e6de2611-4029-48c8-b441-eece6a62eef0', 'X-RAY BOTH HIP JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('c1da7978-713b-4a67-ac0f-786a3c1cf75f', 'X-RAY CERVICAL SPINE AP & LATERAL', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('6be1869c-51ab-4101-9d5d-2fb5f7c4353d', 'X-RAY CERVICAL SPINE AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('ddb420d2-b1c7-433e-85a8-1f7a6f9ec253', 'X-RAY CERVICAL SPINE LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('1c50abcd-61ed-497c-9849-e424bfae62dc', 'X-RAY CHEST AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('672b8ba8-0a86-4037-a7af-0094fa58e739', 'X-RAY CHEST LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('2a694ccc-9efb-4810-a649-785a40b5c014', 'X-RAY CHEST PA', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('3e2e49f2-8e49-451e-91b2-1642ae34276f', 'X-RAY CHEST PA VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('c0fa03fb-f5cb-466a-8f01-5d184214a663', 'X-RAY COCCYX AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('f1bcbbff-df26-418b-adce-e31c9218b4fd', 'X-RAY COCCYX AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('eeb34498-7cac-4f9b-99e1-a07942506d05', 'X-RAY COCCYX LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('7ecf5ffb-1dc9-47fd-ae7d-ad2aa98de07c', 'X-RAY DORSAL SPINE AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('0c1a81c7-7805-4261-a2a5-a51734f805e3', 'X-RAY DORSAL SPINE AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('a44db7bb-a8f0-435d-8621-7a1ba7a86146', 'X-RAY DORSAL SPINE LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('12e51cf9-aa05-428a-b386-536a6a53f21c', 'X-RAY ELBOW JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('7fb28462-cc64-43b7-b4c8-11fa4a8c8b57', 'X-RAY ELBOW JOINT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('c35b9368-73bf-48e4-ade5-7d71d6ff3140', 'X-RAY ELBOW JOINT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('6df5d175-27ed-4d18-a136-a143ed31770d', 'X-RAY FOOT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('20ffb1e2-cce7-4673-a380-0f146126beff', 'X-RAY FOOT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('4398cf47-71c3-4204-9723-7bc5722e382d', 'X-RAY FOOT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('be3cc8c8-66e6-4d3a-aa67-4ae337a754a2', 'X-RAY FOREARM AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('126dfae7-ce98-4245-bcfe-11db12057494', 'X-RAY FOREARM AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('559a231c-cd85-4198-85cb-e965aec253d1', 'X-RAY FOREARM LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('5e59e332-bdad-4d04-bbdb-83697b7cf32d', 'X-RAY HAND AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('ea6466f4-937a-4130-95d8-e4e79f54f2d6', 'X-RAY HAND AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('8cded592-60bf-47f1-b582-2a75a2f4c6d7', 'X-RAY HAND LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('3d9295ed-8087-497f-8be8-a7e3cab0079f', 'X-RAY IVP', 'Radiology', 2300.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('82a5ba59-df8d-4fdc-a224-d7c9d771f637', 'X-RAY KNEE JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('84528b14-f54d-4f1d-8d0a-d265d45092a3', 'X-RAY KNEE JOINT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('c7b3516b-b258-4e01-a2ff-e97d6348f259', 'X-RAY KNEE JOINT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('50af7d46-3aa4-42ce-938d-ac266a81fe40', 'X-RAY KUB', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('cf0b7734-20a1-4c06-b8f9-76eeca59e134', 'X-RAY LEFT ANKLE AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('0ed5e26b-2302-402f-aa46-4ed2823b4755', 'X-RAY LEFT ANKLE AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('0f221210-1a1e-4353-a748-a6146c1ac8ae', 'X-RAY LEFT ANLKLE LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('2ec3947c-7e11-46b6-b698-68cba21ac48f', 'X-RAY LEFT ELBOW AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('fe5ce3e4-6052-44d6-b433-1c78eb691bc7', 'X-RAY LEFT ELBOW AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('364834e9-b632-4a5a-9b91-ed76f064f8cd', 'X-RAY LEFT ELBOW LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('dcccde30-c477-426d-b863-687d479d3cc3', 'X-RAY LEFT FOREARM AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('032c863d-b513-488b-a8eb-418b2c6a0d32', 'X-RAY LEFT HAND AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('c5de8329-3d27-47e3-8b2b-efc1597f17f6', 'X-RAY LEFT HAND AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('0da3e429-7c64-42a6-8867-97e74b70be40', 'X-RAY LEFT HAND LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('8c278840-99eb-4da3-89fa-b1c5843dec8b', 'X-RAY LEFT HEEL LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('17049672-052e-4074-8087-23bd040e13f1', 'X-RAY LEFT HUMEROUS AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('189bcadf-78db-4ddf-ae02-ea8b814e155c', 'X-RAY LEFT HUMEROUS AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('a6619228-87cc-4124-b03e-ca2f15096e69', 'X-RAY LEFT HUMEROUS LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('af1fabc0-4550-4abf-a341-ef016591a15e', 'X-RAY LEFT KNEE JOINT AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('6968edf9-2a08-459d-bbfd-ef8303329191', 'X-RAY LEFT KNEE JOINT AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('39afbd25-f077-4f40-b7be-e727ec06b484', 'X-RAY LEFT KNEE JOINT LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('dab1730f-d2b5-45d1-89c7-5b1237fff4b4', 'X-RAY LEFT LEG AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:13.410743', '2025-09-12 17:28:13.410743');
INSERT INTO public.lab_test_definitions VALUES ('d3dba723-80ec-4f1d-b19b-65aef194c558', 'X-RAY LEFT LEG AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('eaca61e2-d310-468d-adad-f3aaece69a02', 'X-RAY LEFT LEG LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('8458a6f2-48c1-48da-9f11-325a676e37c7', 'X-RAY LEFT MANDIABLE AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('618f3c47-fcda-4b93-b211-deb96a6d6420', 'X-RAY LEFT MANDIABLE AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('7a46a351-dc45-4bfe-82eb-14bfc8ff6271', 'X-RAY LEFT MANDIABLE LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('89b8c228-2007-4ef5-8f7c-5d5a2077d014', 'X-RAY LEFT SHOULDER AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('75736955-0272-45ea-89c8-32d7c5a1eaf2', 'X-RAY LEFT SHOULDER AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('74bcf85b-b174-47a0-bb50-714b8f86581e', 'X-RAY LEFT SHOULDER AXIL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('794fd62c-5d60-4003-b078-067fa55b8029', 'X-RAY LEFT SHOULDER LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('734b30b3-0e89-46c6-9f22-6a9c79a58013', 'X-RAY LEFT THIGH AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('ca45ffed-c7cf-491a-81d7-8a0d45c064c5', 'X-RAY LEFT THIGH AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('5214603f-c3d8-4b3a-ad2d-e18356363ede', 'X-RAY LEFT THIGH LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('e2f62d5a-b5ef-4996-bf12-f58c43cede5d', 'X-RAY LEFT WRIST AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('e4750bd7-aae2-440c-8366-27c2ac0ad6ff', 'X-RAY LEFT WRIST AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('365ed0d0-2a55-45fb-afa4-a044a4756462', 'X-RAY LEFT WRIST LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('3f92933f-48c8-47bd-8e4e-76b43074f671', 'X-RAY LEG AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('d7049573-7939-420e-92b8-aa14ce650196', 'X-RAY LEG AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:35.126119', '2025-09-12 17:24:35.126119');
INSERT INTO public.lab_test_definitions VALUES ('8bb4db38-257f-4318-ac4c-23131bef627c', 'X-RAY LEG LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('f9aeb483-a9a2-4bf7-b431-7ae84cef1c5b', 'X-RAY LUMBAR SPINE AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('65a2401a-d264-4194-a99c-b0717e70695b', 'X-RAY LUMBAR SPINE AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('3ff10b96-4890-49ef-9eef-82d414479920', 'X-RAY LUMBAR SPINE LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('c3390011-06c5-4b0f-b23c-9115889a03d7', 'X-RAY PELVIS', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('b06e179e-f29e-40b1-84b7-e1fbc3186eeb', 'X-RAY PELVIS AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('1656a0ba-5848-44d7-aa24-01368571c0cf', 'X-RAY PELVIS LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('b0a5d238-edca-42d0-af1f-ddee5f1cf014', 'X-RAY PNS', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:24:07.968624', '2025-09-12 17:24:07.968624');
INSERT INTO public.lab_test_definitions VALUES ('a42c9c5a-7a8b-47c4-be3f-1359c635c9e3', 'X-RAY RIGHT ANKLE AP  & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('78e2ea4a-a755-4f97-b412-4965e0a87c25', 'X-RAY RIGHT ANKLE AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('fe4204f5-fcff-4b55-997a-52b3cb9ce810', 'X-RAY RIGHT ANKLE LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('01f431af-012d-40ef-bdd0-3d39eba4031a', 'X-RAY RIGHT ELBOW AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('d9d9ec14-63fb-49e8-87db-2bbe60e162a4', 'X-RAY RIGHT ELBOW AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:36.059247', '2025-09-12 17:28:36.059247');
INSERT INTO public.lab_test_definitions VALUES ('1a1098aa-883d-4926-b6c8-511b6469d92a', 'X-RAY RIGHT ELBOW LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('29556aff-13b0-4cd3-b61a-2ae1a0e1fb5a', 'X-RAY RIGHT FOREARM AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('e6edb549-7000-405c-a683-fbaa09154bc5', 'X-RAY RIGHT HAND AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('b67741b9-3075-4f5f-9595-62f48797552a', 'X-RAY RIGHT HAND AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('7874ce45-94ba-419e-86d3-382dbefcb6f2', 'X-RAY RIGHT HAND LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('d7387737-aa5c-4179-b4ac-de42e0afac32', 'X-RAY RIGHT HEEL LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('17d0f492-d61c-486e-9be2-a2fa8d4e39e0', 'X-RAY RIGHT HIP JOINT AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('d13ab6c1-0908-4a90-893b-094f0ea9b522', 'X-RAY RIGHT HIP JOINT AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('0d4cc1be-fc06-4b34-ab02-f592571ffd43', 'X-RAY RIGHT HIP JOINT LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('c65370a9-294e-4eae-b230-667edb2d7552', 'X-RAY RIGHT HUMEROUS AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('e0b95a96-a2e2-409a-8635-dbdc5bc60fd6', 'X-RAY RIGHT HUMEROUS AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('fee30cc4-67bb-4a3d-a36f-82e6989ded27', 'X-RAY RIGHT HUMEROUS LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('9f607736-fc8b-4325-87f9-327c3b2f08d6', 'X-RAY RIGHT KNEE JOINT AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('961e72f9-2528-42d5-8d2b-d668d966aa86', 'X-RAY RIGHT KNEE JOINT AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('cf4ddb09-f80c-490b-9696-ae4729287477', 'X-RAY RIGHT LEG AP & LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('3fbd94f6-e658-4477-a835-c36046aceb19', 'X-RAY RIGHT LEG AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('079d3fdc-2280-4124-9a4f-3539ff6174f7', 'X-RAY RIGHT LEG LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('75aee13d-d594-4c05-9aa1-1f551f9a180a', 'X-RAY RIGHT MANDIABLE AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('f6a06a20-727b-43fa-b48e-cd5a09086b29', 'X-RAY RIGHT MANDIABLE AP VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('a1927f73-65e1-4912-bf2a-474b4f629c71', 'X-RAY RIGHT MANDIABLE LATERAL VIEW', 'Radiology', 200.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:28:48.981815', '2025-09-12 17:28:48.981815');
INSERT INTO public.lab_test_definitions VALUES ('7266216c-294a-4fea-84d5-465a054206ff', 'X-RAY RIGHT SHOULDER AP & LATERAL VIEW', 'Radiology', 400.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('48be9507-cd63-4d72-893e-148da0ffaec8', 'X-RAY RIGHT SHOULDER AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('82793c89-16d4-418d-b149-854740d49782', 'X-RAY RIGHT SHOULDER AXIL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('a6dc145a-ffa5-4ba5-a0e3-31f63c300625', 'X-RAY RIGHT SHOULDER LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('1ed0f950-7a93-40f1-803e-bcf4d77ed492', 'X-RAY RIGHT THIGH AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('7621787b-d731-4e51-958e-d68d0c8ac5dc', 'X-RAY RIGHT THIGH AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('5444ede5-8518-4ccd-adb8-23f1b915f03b', 'X-RAY RIGHT THIGH LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('28a2eae9-998f-45ff-8330-b75d7c850537', 'X-RAY RIGHT WRIST AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('81cff1c7-a49b-436d-b920-4f39d0acfad2', 'X-RAY RIGHT WRIST AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('ccbc9ce0-e30d-493a-89b8-68aa908fb3b2', 'X-RAY RIGHT WRIST LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('02d8635c-a4a5-442f-a3b3-333bc888dd66', 'X-RAY SACRAM AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('ffcb8400-e197-4a5a-9894-537271499ae2', 'X-RAY SACRAM AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('8fefbdd0-590c-4340-a168-89731cfccaa7', 'X-RAY SACRAM LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:29:13.75484', '2025-09-12 17:29:13.75484');
INSERT INTO public.lab_test_definitions VALUES ('da3820e1-febb-4056-af23-93c02d7547d7', 'X-RAY SACRUM AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('68c2977c-d056-47ee-a037-44e0f83f5b1e', 'X-RAY SACRUM AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('bc5db3fe-b8c2-4392-8570-a82512db913c', 'X-RAY SACRUM LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('e9e2f0d5-207e-455e-9303-a41df9440d1e', 'X-RAY SHOULDER JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('37820ab5-83f6-4a1d-aba6-5a1b8212e38b', 'X-RAY SHOULDER JOINT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('97e9e251-1296-4fa3-92ea-63df99b6c7f2', 'X-RAY SHOULDER JOINT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('21b55f10-e9af-46f4-88b0-f10374d335fe', 'X-RAY SKULL AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('7abc896b-efb1-4c07-96ee-a6022c4ebd54', 'X-RAY SKULL AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('9ca2bb80-b1be-44e0-a984-9718360822fb', 'X-RAY SKULL LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('e32f878c-4d32-4540-a48f-39482726fde5', 'X-RAY THIGH AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('b2a4538f-694a-4d10-af6a-aee4b2cbafae', 'X-RAY THIGH AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('9e889802-3471-4faf-81e4-7783da6808e5', 'X-RAY THIGH LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('4dc4870c-ae04-4ec7-bf28-b256aea55e9f', 'X-RAY WRIST JOINT AP & LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('5d0b63fb-f365-442e-bf34-4c4881646eca', 'X-RAY WRIST JOINT AP VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('d965cf87-6380-4f62-9c3f-c567e163b91e', 'X-RAY WRIST JOINT LATERAL VIEW', 'Radiology', 500.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:02.721896', '2025-09-12 17:25:02.721896');
INSERT INTO public.lab_test_definitions VALUES ('b7da900f-66b6-4e43-a9a2-aa56cf9df569', 'serum igm', 'Pathology', 2000.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:57.51993', '2025-09-12 17:25:57.51993');
INSERT INTO public.lab_test_definitions VALUES ('39c3366b-9e69-43f4-ac4b-687290cfe771', 'vcvcvvcvcvcvc', 'Pathology', 100.00, '', NULL, true, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 17:25:51.570363', '2025-09-12 17:25:51.570363');


ALTER TABLE public.lab_test_definitions ENABLE TRIGGER ALL;

--
-- Data for Name: patients_registration; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.patients_registration DISABLE TRIGGER ALL;

INSERT INTO public.patients_registration VALUES ('b29807c6-4632-4bf7-9825-27f39f83d051', 'MRU25-0001', 'VID-541293782', 'Mr.', 'Chintu', 3, 'years', 'male', '2022-09-11 00:00:00', '8837823829', NULL, NULL, 'A+', NULL, NULL, NULL, NULL, '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-12 16:45:40.545975', '2025-09-12 16:45:40.545975');


ALTER TABLE public.patients_registration ENABLE TRIGGER ALL;

--
-- Data for Name: lab_tests; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.lab_tests DISABLE TRIGGER ALL;

INSERT INTO public.lab_tests VALUES ('4168dc2d-653c-4ae6-9396-0d54d7fcbf80', 'b29807c6-4632-4bf7-9825-27f39f83d051', '[{"id": "f7f2fafa-0960-4897-88b0-f8de63a8a37d", "cost": 300, "testName": "CBP", "department": "Hematology"}]', '"[{\"testName\":\"HAEMOGLOBIN\",\"value\":\"23\",\"unit\":\"gms%\",\"normalRange\":\"(M) 13.5 - 18 gms%|(F) 11.5 - 16 gms%\",\"status\":\"high\"},{\"testName\":\"Total R.B.C COUNT\",\"value\":\"7.7\",\"unit\":\"Mill/Cumm\",\"normalRange\":\"(M) 4.5 - 6.0 Mill/Cumm|(F) 3.5 - 5.5 Mill/Cumm\",\"status\":\"high\"},{\"testName\":\"P.C.V\",\"value\":\"69.0\",\"unit\":\"Vol%\",\"normalRange\":\"(M) 40-54%|(F) 36-41%\",\"status\":\"high\"},{\"testName\":\"MCV\",\"value\":\"89.6\",\"unit\":\"fL\",\"normalRange\":\"80 - 100 fL\",\"status\":\"normal\"},{\"testName\":\"MCH\",\"value\":\"29.9\",\"unit\":\"pg\",\"normalRange\":\"27 - 33 pg\",\"status\":\"normal\"},{\"testName\":\"MCHC\",\"value\":\"33.3\",\"unit\":\"g/dL\",\"normalRange\":\"32 - 36 g/dL\",\"status\":\"normal\"},{\"testName\":\"W.B.C (TOTAL)\",\"value\":\"23\",\"unit\":\"/Cumm\",\"normalRange\":\"4000-11000/Cumm\",\"status\":\"low\"},{\"testName\":\"NEUTROPHILS\",\"value\":\"22.98\",\"unit\":\"%\",\"normalRange\":\"50-70%\",\"status\":\"low\"},{\"testName\":\"LYMPHOCYTES\",\"value\":\"23\",\"unit\":\"%\",\"normalRange\":\"20-40%\",\"status\":\"normal\"},{\"testName\":\"EOSINOPHILS\",\"value\":\"23\",\"unit\":\"%\",\"normalRange\":\"1-4%\",\"status\":\"high\"},{\"testName\":\"MONOCYTES\",\"value\":\"22.99\",\"unit\":\"%\",\"normalRange\":\"2-8%\",\"status\":\"high\"},{\"testName\":\"BASOPHILS\",\"value\":\"43\",\"unit\":\"%\",\"normalRange\":\"0.5-1%\",\"status\":\"high\"},{\"testName\":\"PLATELETS COUNT\",\"value\":\"22.98\",\"unit\":\"Lakhs/Cumm\",\"normalRange\":\"1.5-4.5 Lakhs/Cumm\",\"status\":\"low\"},{\"testName\":\"a. RBC''s\",\"value\":\"NORMOCYTIC\",\"unit\":\"units\",\"normalRange\":\"Morphological assessment\",\"status\":\"normal\"},{\"testName\":\"b. WBC''s\",\"value\":\"within limits\",\"unit\":\"units\",\"normalRange\":\"Functional assessment\",\"status\":\"normal\"},{\"testName\":\"c. PLATELETS\",\"value\":\"adequate\",\"unit\":\"units\",\"normalRange\":\"Adequacy assessment\",\"status\":\"normal\"},{\"testName\":\"SAMPLE TYPE\",\"value\":\"whole blood EDTA\",\"unit\":\"units\",\"normalRange\":\"Collection method\",\"status\":\"normal\"}]"', NULL, 300.00, 'completed', '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-13 01:51:20.497682');
INSERT INTO public.lab_tests VALUES ('f2b9dd89-a640-4d2a-9e56-cc1281e9ff33', 'b29807c6-4632-4bf7-9825-27f39f83d051', '[{"id": "f7f2fafa-0960-4897-88b0-f8de63a8a37d", "cost": 300, "testName": "CBP", "department": "Hematology"}]', '"[{\"testName\":\"HAEMOGLOBIN\",\"value\":\"111\",\"unit\":\"gms%\",\"normalRange\":\"(M) 13.5 - 18 gms%|(F) 11.5 - 16 gms%\",\"status\":\"high\"},{\"testName\":\"Total R.B.C COUNT\",\"value\":\"37.0\",\"unit\":\"Mill/Cumm\",\"normalRange\":\"(M) 4.5 - 6.0 Mill/Cumm|(F) 3.5 - 5.5 Mill/Cumm\",\"status\":\"high\"},{\"testName\":\"P.C.V\",\"value\":\"333.0\",\"unit\":\"Vol%\",\"normalRange\":\"(M) 40-54%|(F) 36-41%\",\"status\":\"high\"},{\"testName\":\"MCV\",\"value\":\"90.0\",\"unit\":\"fL\",\"normalRange\":\"80 - 100 fL\",\"status\":\"normal\"},{\"testName\":\"MCH\",\"value\":\"30.0\",\"unit\":\"pg\",\"normalRange\":\"27 - 33 pg\",\"status\":\"normal\"},{\"testName\":\"MCHC\",\"value\":\"33.3\",\"unit\":\"g/dL\",\"normalRange\":\"32 - 36 g/dL\",\"status\":\"normal\"},{\"testName\":\"W.B.C (TOTAL)\",\"value\":\"222\",\"unit\":\"/Cumm\",\"normalRange\":\"4000-11000/Cumm\",\"status\":\"low\"},{\"testName\":\"NEUTROPHILS\",\"value\":\"1\",\"unit\":\"%\",\"normalRange\":\"50-70%\",\"status\":\"low\"},{\"testName\":\"LYMPHOCYTES\",\"value\":\"2221.98\",\"unit\":\"%\",\"normalRange\":\"20-40%\",\"status\":\"high\"},{\"testName\":\"EOSINOPHILS\",\"value\":\"1\",\"unit\":\"%\",\"normalRange\":\"1-4%\",\"status\":\"normal\"},{\"testName\":\"MONOCYTES\",\"value\":\"2\",\"unit\":\"%\",\"normalRange\":\"2-8%\",\"status\":\"normal\"},{\"testName\":\"BASOPHILS\",\"value\":\"3\",\"unit\":\"%\",\"normalRange\":\"0.5-1%\",\"status\":\"high\"},{\"testName\":\"PLATELETS COUNT\",\"value\":\"1\",\"unit\":\"Lakhs/Cumm\",\"normalRange\":\"1.5-4.5 Lakhs/Cumm\",\"status\":\"low\"},{\"testName\":\"a. RBC''s\",\"value\":\"NORMOCYTIC\",\"unit\":\"units\",\"normalRange\":\"Morphological assessment\",\"status\":\"normal\"},{\"testName\":\"b. WBC''s\",\"value\":\"within limits\",\"unit\":\"units\",\"normalRange\":\"Functional assessment\",\"status\":\"normal\"},{\"testName\":\"c. PLATELETS\",\"value\":\"adequate\",\"unit\":\"units\",\"normalRange\":\"Adequacy assessment\",\"status\":\"normal\"},{\"testName\":\"SAMPLE TYPE\",\"value\":\"whole blood EDTA\",\"unit\":\"units\",\"normalRange\":\"Collection method\",\"status\":\"normal\"}]"', NULL, 300.00, 'completed', '883c712e-8b31-46cd-b46b-9b11f0a41cbe', '2025-09-13 02:40:56.508606');


ALTER TABLE public.lab_tests ENABLE TRIGGER ALL;

--
-- Data for Name: medical_history; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.medical_history DISABLE TRIGGER ALL;



ALTER TABLE public.medical_history ENABLE TRIGGER ALL;

--
-- Data for Name: medicine_inventory; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.medicine_inventory DISABLE TRIGGER ALL;



ALTER TABLE public.medicine_inventory ENABLE TRIGGER ALL;

--
-- Data for Name: patient_profiles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.patient_profiles DISABLE TRIGGER ALL;



ALTER TABLE public.patient_profiles ENABLE TRIGGER ALL;

--
-- Data for Name: prescriptions; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.prescriptions DISABLE TRIGGER ALL;



ALTER TABLE public.prescriptions ENABLE TRIGGER ALL;

--
-- Data for Name: surgical_case_sheets; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

ALTER TABLE public.surgical_case_sheets DISABLE TRIGGER ALL;



ALTER TABLE public.surgical_case_sheets ENABLE TRIGGER ALL;

--
-- PostgreSQL database dump complete
--

