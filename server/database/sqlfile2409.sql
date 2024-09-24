--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Announcement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Announcement" (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    created_date timestamp with time zone NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public."Announcement" OWNER TO postgres;

--
-- Name: Announcement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Announcement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Announcement_id_seq" OWNER TO postgres;

--
-- Name: Announcement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Announcement_id_seq" OWNED BY public."Announcement".id;


--
-- Name: Attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attachment" (
    id integer NOT NULL,
    attachment_name character varying NOT NULL,
    url character varying NOT NULL,
    created_date timestamp with time zone NOT NULL,
    ticket_id integer NOT NULL,
    attachment_type character varying
);


ALTER TABLE public."Attachment" OWNER TO postgres;

--
-- Name: Attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Attachment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Attachment_id_seq" OWNER TO postgres;

--
-- Name: Attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Attachment_id_seq" OWNED BY public."Attachment".id;


--
-- Name: Audience_Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Audience_Type" (
    id integer NOT NULL,
    audience_type_name character varying NOT NULL
);


ALTER TABLE public."Audience_Type" OWNER TO postgres;

--
-- Name: Audience_Type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Audience_Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Audience_Type_id_seq" OWNER TO postgres;

--
-- Name: Audience_Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Audience_Type_id_seq" OWNED BY public."Audience_Type".id;


--
-- Name: Dorm; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dorm" (
    id integer NOT NULL,
    area character varying NOT NULL,
    room character varying NOT NULL
);


ALTER TABLE public."Dorm" OWNER TO postgres;

--
-- Name: Dorm_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Dorm_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Dorm_id_seq" OWNER TO postgres;

--
-- Name: Dorm_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Dorm_id_seq" OWNED BY public."Dorm".id;


--
-- Name: Event_Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_Type" (
    id integer NOT NULL,
    event_type_name character varying NOT NULL
);


ALTER TABLE public."Event_Type" OWNER TO postgres;

--
-- Name: Event_Type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Event_Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Event_Type_id_seq" OWNER TO postgres;

--
-- Name: Event_Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Event_Type_id_seq" OWNED BY public."Event_Type".id;


--
-- Name: Feedback; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Feedback" (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    created_date timestamp with time zone NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public."Feedback" OWNER TO postgres;

--
-- Name: Feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Feedback_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Feedback_id_seq" OWNER TO postgres;

--
-- Name: Feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Feedback_id_seq" OWNED BY public."Feedback".id;


--
-- Name: Log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Log" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    description text NOT NULL,
    "timestamp" timestamp with time zone
);


ALTER TABLE public."Log" OWNER TO postgres;

--
-- Name: Log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Log_id_seq" OWNER TO postgres;

--
-- Name: Log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Log_id_seq" OWNED BY public."Log".id;


--
-- Name: Message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Message" (
    id integer NOT NULL,
    ticket_id integer NOT NULL,
    sender_id integer NOT NULL,
    message_details text NOT NULL,
    created_date timestamp with time zone NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    created_date timestamp with time zone NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Notification_Audience; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification_Audience" (
    notification_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public."Notification_Audience" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Notification_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Notification_id_seq" OWNER TO postgres;

--
-- Name: Notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Notification_id_seq" OWNED BY public."Notification".id;


--
-- Name: Rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rating" (
    ticket_id integer NOT NULL,
    rating_score integer NOT NULL,
    created_date timestamp with time zone NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Rating" OWNER TO postgres;

--
-- Name: Rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Rating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Rating_id_seq" OWNER TO postgres;

--
-- Name: Rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Rating_id_seq" OWNED BY public."Rating".id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Role" (
    id integer NOT NULL,
    role_name character varying NOT NULL
);


ALTER TABLE public."Role" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Role_id_seq" OWNER TO postgres;

--
-- Name: Role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Role_id_seq" OWNED BY public."Role".id;


--
-- Name: Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket" (
    id integer NOT NULL,
    ticket_type_id integer NOT NULL,
    content text NOT NULL,
    audience_type_id integer NOT NULL,
    ticket_status_id integer NOT NULL,
    created_date timestamp with time zone NOT NULL,
    ended_date timestamp with time zone,
    subject character varying NOT NULL
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- Name: Ticket_Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_Comment_id_seq" OWNER TO postgres;

--
-- Name: Ticket_Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_Comment_id_seq" OWNED BY public."Message".id;


--
-- Name: Ticket_Role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket_Role" (
    role_id integer NOT NULL,
    ticket_type_id integer NOT NULL,
    can_create boolean NOT NULL,
    can_read boolean NOT NULL,
    can_update boolean NOT NULL,
    can_delete boolean NOT NULL
);


ALTER TABLE public."Ticket_Role" OWNER TO postgres;

--
-- Name: Ticket_Status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket_Status" (
    id integer NOT NULL,
    status_name character varying NOT NULL
);


ALTER TABLE public."Ticket_Status" OWNER TO postgres;

--
-- Name: Ticket_Status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_Status_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_Status_id_seq" OWNER TO postgres;

--
-- Name: Ticket_Status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_Status_id_seq" OWNED BY public."Ticket_Status".id;


--
-- Name: Ticket_Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket_Type" (
    id integer NOT NULL,
    ticket_type_name character varying NOT NULL,
    priority integer NOT NULL
);


ALTER TABLE public."Ticket_Type" OWNER TO postgres;

--
-- Name: Ticket_Type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_Type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_Type_id_seq" OWNER TO postgres;

--
-- Name: Ticket_Type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_Type_id_seq" OWNED BY public."Ticket_Type".id;


--
-- Name: Ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Ticket_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Ticket_id_seq" OWNER TO postgres;

--
-- Name: Ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Ticket_id_seq" OWNED BY public."Ticket".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    username character varying NOT NULL,
    fullname character varying NOT NULL,
    email character varying NOT NULL,
    role_id integer NOT NULL,
    password character varying NOT NULL,
    gender character varying NOT NULL,
    created_date timestamp with time zone NOT NULL,
    program character varying,
    dorm_id integer NOT NULL,
    phone_number character varying NOT NULL,
    intake character varying,
    place_of_birth character varying NOT NULL,
    date_of_birth date NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_Ticket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User_Ticket" (
    user_id integer NOT NULL,
    ticket_id integer NOT NULL
);


ALTER TABLE public."User_Ticket" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Announcement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement" ALTER COLUMN id SET DEFAULT nextval('public."Announcement_id_seq"'::regclass);


--
-- Name: Attachment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attachment" ALTER COLUMN id SET DEFAULT nextval('public."Attachment_id_seq"'::regclass);


--
-- Name: Audience_Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audience_Type" ALTER COLUMN id SET DEFAULT nextval('public."Audience_Type_id_seq"'::regclass);


--
-- Name: Dorm id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dorm" ALTER COLUMN id SET DEFAULT nextval('public."Dorm_id_seq"'::regclass);


--
-- Name: Event_Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_Type" ALTER COLUMN id SET DEFAULT nextval('public."Event_Type_id_seq"'::regclass);


--
-- Name: Feedback id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback" ALTER COLUMN id SET DEFAULT nextval('public."Feedback_id_seq"'::regclass);


--
-- Name: Log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log" ALTER COLUMN id SET DEFAULT nextval('public."Log_id_seq"'::regclass);


--
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_Comment_id_seq"'::regclass);


--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


--
-- Name: Rating id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rating" ALTER COLUMN id SET DEFAULT nextval('public."Rating_id_seq"'::regclass);


--
-- Name: Role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role" ALTER COLUMN id SET DEFAULT nextval('public."Role_id_seq"'::regclass);


--
-- Name: Ticket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_id_seq"'::regclass);


--
-- Name: Ticket_Status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Status" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_Status_id_seq"'::regclass);


--
-- Name: Ticket_Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Type" ALTER COLUMN id SET DEFAULT nextval('public."Ticket_Type_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Announcement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Announcement" (id, sender_id, content, created_date, title) FROM stdin;
1	19	Announcement: Scheduled Maintenance for A Service\n\nDear Students,\n\nPlease be informed that A Service will undergo scheduled maintenance on:\n\nDate: 30.09.2024\nTime: from 10:00 to 14:00 \n\nDuring this time, the service will be temporarily unavailable as we perform essential updates and improvements. We apologize for any inconvenience this may cause and appreciate your understanding.\n\nShould you have any questions or concerns, please feel free to contact the admin team.\n\nThank you for your cooperation.\n\nBest regards,\nVGU SLS ADMIN TEAM	2024-09-21 03:30:08+07	Scheduled Maintenance for the Service
\.


--
-- Data for Name: Attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attachment" (id, attachment_name, url, created_date, ticket_id, attachment_type) FROM stdin;
5	sample2.jpg	https://picsum.photos/1080/900	2024-09-23 03:22:51+07	3	image
6	video.mp4	https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4	2024-09-23 03:23:42+07	3	video
4	sample.jpg	https://freshknots.in/wp-content/uploads/2023/03/rose.png.webp	2024-09-22 23:18:25+07	3	image
14	z5749231140673_65fca20e9bdb4509ef509e6e68c3ed4f.jpg	http://localhost:3000/api/v1/attachments/z5749231140673_65fca20e9bdb4509ef509e6e68c3ed4f.jpg	2024-09-23 22:46:57.466+07	34	image/jpeg
15	5812146838664.mp4	http://localhost:3000/api/v1/attachments/5812146838664.mp4	2024-09-23 22:46:57.466+07	34	video/mp4
16	crying_emoji.png	http://localhost:3000/api/v1/attachments/crying_emoji.png	2024-09-24 02:54:40.96+07	35	image/png
\.


--
-- Data for Name: Audience_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Audience_Type" (id, audience_type_name) FROM stdin;
1	private
2	public
\.


--
-- Data for Name: Dorm; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Dorm" (id, area, room) FROM stdin;
1	0	0
2	D1	001
3	D1	002
4	D1	003
5	D1	004
6	D1	005
7	D1	006
8	D1	007
9	D1	008
10	D1	009
11	D1	010
12	D1	011
13	D1	012
14	D1	013
15	D1	014
16	D1	015
17	D1	016
18	D1	017
19	D1	018
20	D1	019
21	D1	020
22	D1	021
23	D1	022
24	D1	023
25	D1	024
26	D1	025
27	D1	026
28	D1	027
29	D1	028
30	D1	029
31	D1	030
32	D1	031
33	D1	032
34	D1	033
35	D1	034
36	D1	035
37	D1	036
38	D1	037
39	D1	038
40	D1	039
41	D1	040
42	D1	041
43	D1	042
44	D1	043
45	D1	044
46	D1	045
47	D1	046
48	D1	047
49	D1	048
50	D1	049
51	D1	050
52	D1	051
53	D1	052
54	D1	053
55	D1	054
56	D1	055
57	D1	056
58	D1	057
59	D1	058
60	D1	059
61	D1	060
62	D1	061
63	D1	062
64	D1	063
65	D1	064
66	D1	065
67	D1	066
68	D1	067
69	D1	068
70	D1	069
71	D1	070
72	D1	071
73	D1	072
74	D1	073
75	D1	074
76	D1	075
77	D1	076
78	D1	077
79	D1	078
80	D1	079
81	D1	080
82	D1	081
83	D1	082
84	D1	083
85	D1	084
86	D1	085
87	D1	086
88	D1	087
89	D1	088
90	D1	089
91	D1	090
92	D1	091
93	D1	092
94	D1	093
95	D1	094
96	D1	095
97	D1	096
98	D1	097
99	D1	098
100	D1	099
101	D1	100
102	D1	101
103	D1	102
104	D1	103
105	D1	104
106	D1	105
107	D1	106
108	D1	107
109	D1	108
110	D1	109
111	D1	110
112	D1	111
113	D1	112
114	D1	113
115	D1	114
116	D1	115
117	D1	116
118	D1	117
119	D1	118
120	D1	119
121	D1	120
122	D1	121
123	D1	122
124	D1	123
125	D1	124
126	D1	125
127	D1	126
128	D1	127
129	D1	128
130	D1	129
131	D1	130
132	D1	131
133	D1	132
134	D1	133
135	D1	134
136	D1	135
137	D1	136
138	D1	137
139	D1	138
140	D1	139
141	D1	140
142	D1	141
143	D1	142
144	D1	143
145	D1	144
146	D1	145
147	D1	146
148	D1	147
149	D1	148
150	D1	149
151	D1	150
152	D1	151
153	D1	152
154	D1	153
155	D1	154
156	D1	155
157	D1	156
158	D1	157
159	D1	158
160	D1	159
161	D1	160
162	D1	161
163	D1	162
164	D1	163
165	D1	164
166	D1	165
167	D1	166
168	D1	167
169	D1	168
170	D1	169
171	D1	170
172	D1	171
173	D1	172
174	D1	173
175	D1	174
176	D1	175
177	D1	176
178	D1	177
179	D1	178
180	D1	179
181	D1	180
182	D1	181
183	D1	182
184	D1	183
185	D1	184
186	D1	185
187	D1	186
188	D1	187
189	D1	188
190	D1	189
191	D1	190
192	D1	191
193	D1	192
194	D1	193
195	D1	194
196	D1	195
197	D1	196
198	D1	197
199	D1	198
200	D1	199
201	D1	200
202	D1	201
203	D1	202
204	D1	203
205	D1	204
206	D1	205
207	D1	206
208	D1	207
209	D1	208
210	D1	209
211	D1	210
212	D1	211
213	D1	212
214	D1	213
215	D1	214
216	D1	215
217	D1	216
218	D1	217
219	D1	218
220	D1	219
221	D1	220
222	D1	221
223	D1	222
224	D1	223
225	D1	224
226	D1	225
227	D1	226
228	D1	227
229	D1	228
230	D1	229
231	D1	230
232	D1	231
233	D1	232
234	D1	233
235	D1	234
236	D1	235
237	D1	236
238	D1	237
239	D1	238
240	D1	239
241	D1	240
242	D1	241
243	D1	242
244	D1	243
245	D1	244
246	D1	245
247	D1	246
248	D1	247
249	D1	248
250	D1	249
251	D1	250
252	D1	251
253	D1	252
254	D1	253
255	D1	254
256	D1	255
257	D1	256
258	D1	257
259	D1	258
260	D1	259
261	D1	260
262	D1	261
263	D1	262
264	D1	263
265	D1	264
266	D1	265
267	D1	266
268	D1	267
269	D1	268
270	D1	269
271	D1	270
272	D1	271
273	D1	272
274	D1	273
275	D1	274
276	D1	275
277	D1	276
278	D1	277
279	D1	278
280	D1	279
281	D1	280
282	D1	281
283	D1	282
284	D1	283
285	D1	284
286	D1	285
287	D1	286
288	D1	287
289	D1	288
290	D1	289
291	D1	290
292	D1	291
293	D1	292
294	D1	293
295	D1	294
296	D1	295
297	D1	296
298	D1	297
299	D1	298
300	D1	299
301	D1	300
302	D1	301
303	D1	302
304	D1	303
305	D1	304
306	D1	305
307	D1	306
308	D1	307
309	D1	308
310	D1	309
311	D1	310
312	D1	311
313	D1	312
314	D1	313
315	D1	314
316	D1	315
317	D1	316
318	D1	317
319	D1	318
320	D1	319
321	D1	320
322	D1	321
323	D1	322
324	D1	323
325	D1	324
326	D1	325
327	D1	326
328	D1	327
329	D1	328
330	D1	329
331	D1	330
332	D1	331
333	D1	332
334	D1	333
335	D1	334
336	D1	335
337	D1	336
338	D1	337
339	D1	338
340	D1	339
341	D1	340
342	D1	341
343	D1	342
344	D1	343
345	D1	344
346	D1	345
347	D1	346
348	D1	347
349	D1	348
350	D1	349
351	D1	350
352	D1	351
353	D1	352
354	D1	353
355	D1	354
356	D1	355
357	D1	356
358	D1	357
359	D1	358
360	D1	359
361	D1	360
362	D1	361
363	D1	362
364	D1	363
365	D1	364
366	D1	365
367	D1	366
368	D1	367
369	D1	368
370	D1	369
371	D1	370
372	D1	371
373	D1	372
374	D1	373
375	D1	374
376	D1	375
377	D1	376
378	D1	377
379	D1	378
380	D1	379
381	D1	380
382	D1	381
383	D1	382
384	D1	383
385	D1	384
386	D1	385
387	D1	386
388	D1	387
389	D1	388
390	D1	389
391	D1	390
392	D1	391
393	D1	392
394	D1	393
395	D1	394
396	D1	395
397	D1	396
398	D1	397
399	D1	398
400	D1	399
401	D1	400
402	D1	401
403	D1	402
404	D1	403
405	D1	404
406	D1	405
407	D1	406
408	D1	407
409	D1	408
410	D1	409
411	D1	410
412	D1	411
413	D1	412
414	D1	413
415	D1	414
416	D1	415
417	D1	416
418	D1	417
419	D1	418
420	D1	419
421	D1	420
422	D1	421
423	D1	422
424	D1	423
425	D1	424
426	D1	425
427	D1	426
428	D1	427
429	D1	428
430	D1	429
431	D1	430
432	D1	431
433	D1	432
434	D1	433
435	D1	434
436	D1	435
437	D1	436
438	D1	437
439	D1	438
440	D1	439
441	D1	440
442	D1	441
443	D1	442
444	D1	443
445	D1	444
446	D1	445
447	D1	446
448	D1	447
449	D1	448
450	D1	449
451	D1	450
452	D1	451
453	D1	452
454	D1	453
455	D1	454
456	D1	455
457	D1	456
458	D1	457
459	D1	458
460	D1	459
461	D1	460
462	D1	461
463	D1	462
464	D1	463
465	D1	464
466	D1	465
467	D1	466
468	D1	467
469	D1	468
470	D1	469
471	D1	470
472	D1	471
473	D1	472
474	D1	473
475	D1	474
476	D1	475
477	D1	476
478	D1	477
479	D1	478
480	D1	479
481	D1	480
482	D1	481
483	D1	482
484	D1	483
485	D1	484
486	D1	485
487	D1	486
488	D1	487
489	D1	488
490	D1	489
491	D1	490
492	D1	491
493	D1	492
494	D1	493
495	D1	494
496	D1	495
497	D1	496
498	D1	497
499	D1	498
500	D1	499
501	D1	500
502	D1	501
503	D1	502
504	D1	503
505	D1	504
506	D1	505
507	D1	506
508	D1	507
509	D1	508
510	D1	509
511	D1	510
512	D1	511
513	D1	512
514	D1	513
515	D1	514
516	D1	515
517	D1	516
518	D1	517
519	D1	518
520	D1	519
521	D1	520
522	D1	521
523	D1	522
524	D1	523
525	D1	524
526	D1	525
527	D1	526
528	D1	527
529	D1	528
530	D1	529
531	D1	530
532	D1	531
533	D1	532
534	D1	533
535	D1	534
536	D1	535
537	D1	536
538	D1	537
539	D1	538
540	D1	539
541	D1	540
542	D1	541
543	D1	542
544	D1	543
545	D1	544
546	D1	545
547	D1	546
548	D1	547
549	D1	548
550	D1	549
551	D1	550
552	D1	551
553	D1	552
554	D1	553
555	D1	554
556	D1	555
557	D1	556
558	D1	557
559	D1	558
560	D1	559
561	D1	560
562	D1	561
563	D1	562
564	D1	563
565	D1	564
566	D1	565
567	D1	566
568	D1	567
569	D1	568
570	D1	569
571	D1	570
572	D1	571
573	D1	572
574	D1	573
575	D1	574
576	D1	575
577	D1	576
578	D1	577
579	D1	578
580	D1	579
581	D1	580
582	D1	581
583	D1	582
584	D1	583
585	D1	584
586	D1	585
587	D1	586
588	D1	587
589	D1	588
590	D1	589
591	D1	590
592	D1	591
593	D1	592
594	D1	593
595	D1	594
596	D1	595
597	D1	596
598	D1	597
599	D1	598
600	D1	599
601	D1	600
602	D1	601
603	D1	602
604	D1	603
605	D1	604
606	D1	605
607	D1	606
608	D1	607
609	D1	608
610	D1	609
611	D1	610
612	D1	611
613	D1	612
614	D1	613
615	D1	614
616	D1	615
617	D1	616
618	D1	617
619	D1	618
620	D1	619
621	D1	620
622	D1	621
623	D1	622
624	D1	623
625	D1	624
626	D1	625
627	D1	626
628	D1	627
629	D1	628
630	D1	629
631	D1	630
632	D1	631
633	D1	632
634	D1	633
635	D1	634
636	D1	635
637	D1	636
638	D1	637
639	D1	638
640	D1	639
641	D1	640
642	D1	641
643	D1	642
644	D1	643
645	D1	644
646	D1	645
647	D1	646
648	D1	647
649	D1	648
650	D1	649
651	D1	650
652	D1	651
653	D1	652
654	D1	653
655	D1	654
656	D1	655
657	D1	656
658	D1	657
659	D1	658
660	D1	659
661	D1	660
662	D1	661
663	D1	662
664	D1	663
665	D1	664
666	D1	665
667	D1	666
668	D1	667
669	D1	668
670	D1	669
671	D1	670
672	D1	671
673	D1	672
674	D1	673
675	D1	674
676	D1	675
677	D1	676
678	D1	677
679	D1	678
680	D1	679
681	D1	680
682	D1	681
683	D1	682
684	D1	683
685	D1	684
686	D1	685
687	D1	686
688	D1	687
689	D1	688
690	D1	689
691	D1	690
692	D1	691
693	D1	692
694	D1	693
695	D1	694
696	D1	695
697	D1	696
698	D1	697
699	D1	698
700	D1	699
701	D1	700
702	D1	701
703	D1	702
704	D1	703
705	D1	704
706	D1	705
707	D1	706
708	D1	707
709	D1	708
710	D1	709
711	D1	710
712	D1	711
713	D1	712
714	D1	713
715	D1	714
716	D1	715
717	D1	716
718	D1	717
719	D1	718
720	D1	719
721	D1	720
722	D1	721
723	D1	722
724	D1	723
725	D1	724
726	D1	725
727	D1	726
728	D1	727
729	D1	728
730	D1	729
731	D1	730
732	D1	731
733	D1	732
734	D1	733
735	D1	734
736	D1	735
737	D1	736
738	D1	737
739	D1	738
740	D1	739
741	D1	740
742	D1	741
743	D1	742
744	D1	743
745	D1	744
746	D1	745
747	D1	746
748	D1	747
749	D1	748
750	D1	749
751	D1	750
752	D1	751
753	D1	752
754	D1	753
755	D1	754
756	D1	755
757	D1	756
758	D1	757
759	D1	758
760	D1	759
761	D1	760
762	D1	761
763	D1	762
764	D1	763
765	D1	764
766	D1	765
767	D1	766
768	D1	767
769	D1	768
770	D1	769
771	D1	770
772	D1	771
773	D1	772
774	D1	773
775	D1	774
776	D1	775
777	D1	776
778	D1	777
779	D1	778
780	D1	779
781	D1	780
782	D1	781
783	D1	782
784	D1	783
785	D1	784
786	D1	785
787	D1	786
788	D1	787
789	D1	788
790	D1	789
791	D1	790
792	D1	791
793	D1	792
794	D1	793
795	D1	794
796	D1	795
797	D1	796
798	D1	797
799	D1	798
800	D1	799
801	D2	001
802	D2	002
803	D2	003
804	D2	004
805	D2	005
806	D2	006
807	D2	007
808	D2	008
809	D2	009
810	D2	010
811	D2	011
812	D2	012
813	D2	013
814	D2	014
815	D2	015
816	D2	016
817	D2	017
818	D2	018
819	D2	019
820	D2	020
821	D2	021
822	D2	022
823	D2	023
824	D2	024
825	D2	025
826	D2	026
827	D2	027
828	D2	028
829	D2	029
830	D2	030
831	D2	031
832	D2	032
833	D2	033
834	D2	034
835	D2	035
836	D2	036
837	D2	037
838	D2	038
839	D2	039
840	D2	040
841	D2	041
842	D2	042
843	D2	043
844	D2	044
845	D2	045
846	D2	046
847	D2	047
848	D2	048
849	D2	049
850	D2	050
851	D2	051
852	D2	052
853	D2	053
854	D2	054
855	D2	055
856	D2	056
857	D2	057
858	D2	058
859	D2	059
860	D2	060
861	D2	061
862	D2	062
863	D2	063
864	D2	064
865	D2	065
866	D2	066
867	D2	067
868	D2	068
869	D2	069
870	D2	070
871	D2	071
872	D2	072
873	D2	073
874	D2	074
875	D2	075
876	D2	076
877	D2	077
878	D2	078
879	D2	079
880	D2	080
881	D2	081
882	D2	082
883	D2	083
884	D2	084
885	D2	085
886	D2	086
887	D2	087
888	D2	088
889	D2	089
890	D2	090
891	D2	091
892	D2	092
893	D2	093
894	D2	094
895	D2	095
896	D2	096
897	D2	097
898	D2	098
899	D2	099
900	D2	100
901	D2	101
902	D2	102
903	D2	103
904	D2	104
905	D2	105
906	D2	106
907	D2	107
908	D2	108
909	D2	109
910	D2	110
911	D2	111
912	D2	112
913	D2	113
914	D2	114
915	D2	115
916	D2	116
917	D2	117
918	D2	118
919	D2	119
920	D2	120
921	D2	121
922	D2	122
923	D2	123
924	D2	124
925	D2	125
926	D2	126
927	D2	127
928	D2	128
929	D2	129
930	D2	130
931	D2	131
932	D2	132
933	D2	133
934	D2	134
935	D2	135
936	D2	136
937	D2	137
938	D2	138
939	D2	139
940	D2	140
941	D2	141
942	D2	142
943	D2	143
944	D2	144
945	D2	145
946	D2	146
947	D2	147
948	D2	148
949	D2	149
950	D2	150
951	D2	151
952	D2	152
953	D2	153
954	D2	154
955	D2	155
956	D2	156
957	D2	157
958	D2	158
959	D2	159
960	D2	160
961	D2	161
962	D2	162
963	D2	163
964	D2	164
965	D2	165
966	D2	166
967	D2	167
968	D2	168
969	D2	169
970	D2	170
971	D2	171
972	D2	172
973	D2	173
974	D2	174
975	D2	175
976	D2	176
977	D2	177
978	D2	178
979	D2	179
980	D2	180
981	D2	181
982	D2	182
983	D2	183
984	D2	184
985	D2	185
986	D2	186
987	D2	187
988	D2	188
989	D2	189
990	D2	190
991	D2	191
992	D2	192
993	D2	193
994	D2	194
995	D2	195
996	D2	196
997	D2	197
998	D2	198
999	D2	199
1000	D2	200
1001	D2	201
1002	D2	202
1003	D2	203
1004	D2	204
1005	D2	205
1006	D2	206
1007	D2	207
1008	D2	208
1009	D2	209
1010	D2	210
1011	D2	211
1012	D2	212
1013	D2	213
1014	D2	214
1015	D2	215
1016	D2	216
1017	D2	217
1018	D2	218
1019	D2	219
1020	D2	220
1021	D2	221
1022	D2	222
1023	D2	223
1024	D2	224
1025	D2	225
1026	D2	226
1027	D2	227
1028	D2	228
1029	D2	229
1030	D2	230
1031	D2	231
1032	D2	232
1033	D2	233
1034	D2	234
1035	D2	235
1036	D2	236
1037	D2	237
1038	D2	238
1039	D2	239
1040	D2	240
1041	D2	241
1042	D2	242
1043	D2	243
1044	D2	244
1045	D2	245
1046	D2	246
1047	D2	247
1048	D2	248
1049	D2	249
1050	D2	250
1051	D2	251
1052	D2	252
1053	D2	253
1054	D2	254
1055	D2	255
1056	D2	256
1057	D2	257
1058	D2	258
1059	D2	259
1060	D2	260
1061	D2	261
1062	D2	262
1063	D2	263
1064	D2	264
1065	D2	265
1066	D2	266
1067	D2	267
1068	D2	268
1069	D2	269
1070	D2	270
1071	D2	271
1072	D2	272
1073	D2	273
1074	D2	274
1075	D2	275
1076	D2	276
1077	D2	277
1078	D2	278
1079	D2	279
1080	D2	280
1081	D2	281
1082	D2	282
1083	D2	283
1084	D2	284
1085	D2	285
1086	D2	286
1087	D2	287
1088	D2	288
1089	D2	289
1090	D2	290
1091	D2	291
1092	D2	292
1093	D2	293
1094	D2	294
1095	D2	295
1096	D2	296
1097	D2	297
1098	D2	298
1099	D2	299
1100	D2	300
1101	D2	301
1102	D2	302
1103	D2	303
1104	D2	304
1105	D2	305
1106	D2	306
1107	D2	307
1108	D2	308
1109	D2	309
1110	D2	310
1111	D2	311
1112	D2	312
1113	D2	313
1114	D2	314
1115	D2	315
1116	D2	316
1117	D2	317
1118	D2	318
1119	D2	319
1120	D2	320
1121	D2	321
1122	D2	322
1123	D2	323
1124	D2	324
1125	D2	325
1126	D2	326
1127	D2	327
1128	D2	328
1129	D2	329
1130	D2	330
1131	D2	331
1132	D2	332
1133	D2	333
1134	D2	334
1135	D2	335
1136	D2	336
1137	D2	337
1138	D2	338
1139	D2	339
1140	D2	340
1141	D2	341
1142	D2	342
1143	D2	343
1144	D2	344
1145	D2	345
1146	D2	346
1147	D2	347
1148	D2	348
1149	D2	349
1150	D2	350
1151	D2	351
1152	D2	352
1153	D2	353
1154	D2	354
1155	D2	355
1156	D2	356
1157	D2	357
1158	D2	358
1159	D2	359
1160	D2	360
1161	D2	361
1162	D2	362
1163	D2	363
1164	D2	364
1165	D2	365
1166	D2	366
1167	D2	367
1168	D2	368
1169	D2	369
1170	D2	370
1171	D2	371
1172	D2	372
1173	D2	373
1174	D2	374
1175	D2	375
1176	D2	376
1177	D2	377
1178	D2	378
1179	D2	379
1180	D2	380
1181	D2	381
1182	D2	382
1183	D2	383
1184	D2	384
1185	D2	385
1186	D2	386
1187	D2	387
1188	D2	388
1189	D2	389
1190	D2	390
1191	D2	391
1192	D2	392
1193	D2	393
1194	D2	394
1195	D2	395
1196	D2	396
1197	D2	397
1198	D2	398
1199	D2	399
1200	D2	400
1201	D2	401
1202	D2	402
1203	D2	403
1204	D2	404
1205	D2	405
1206	D2	406
1207	D2	407
1208	D2	408
1209	D2	409
1210	D2	410
1211	D2	411
1212	D2	412
1213	D2	413
1214	D2	414
1215	D2	415
1216	D2	416
1217	D2	417
1218	D2	418
1219	D2	419
1220	D2	420
1221	D2	421
1222	D2	422
1223	D2	423
1224	D2	424
1225	D2	425
1226	D2	426
1227	D2	427
1228	D2	428
1229	D2	429
1230	D2	430
1231	D2	431
1232	D2	432
1233	D2	433
1234	D2	434
1235	D2	435
1236	D2	436
1237	D2	437
1238	D2	438
1239	D2	439
1240	D2	440
1241	D2	441
1242	D2	442
1243	D2	443
1244	D2	444
1245	D2	445
1246	D2	446
1247	D2	447
1248	D2	448
1249	D2	449
1250	D2	450
1251	D2	451
1252	D2	452
1253	D2	453
1254	D2	454
1255	D2	455
1256	D2	456
1257	D2	457
1258	D2	458
1259	D2	459
1260	D2	460
1261	D2	461
1262	D2	462
1263	D2	463
1264	D2	464
1265	D2	465
1266	D2	466
1267	D2	467
1268	D2	468
1269	D2	469
1270	D2	470
1271	D2	471
1272	D2	472
1273	D2	473
1274	D2	474
1275	D2	475
1276	D2	476
1277	D2	477
1278	D2	478
1279	D2	479
1280	D2	480
1281	D2	481
1282	D2	482
1283	D2	483
1284	D2	484
1285	D2	485
1286	D2	486
1287	D2	487
1288	D2	488
1289	D2	489
1290	D2	490
1291	D2	491
1292	D2	492
1293	D2	493
1294	D2	494
1295	D2	495
1296	D2	496
1297	D2	497
1298	D2	498
1299	D2	499
1300	D2	500
1301	D2	501
1302	D2	502
1303	D2	503
1304	D2	504
1305	D2	505
1306	D2	506
1307	D2	507
1308	D2	508
1309	D2	509
1310	D2	510
1311	D2	511
1312	D2	512
1313	D2	513
1314	D2	514
1315	D2	515
1316	D2	516
1317	D2	517
1318	D2	518
1319	D2	519
1320	D2	520
1321	D2	521
1322	D2	522
1323	D2	523
1324	D2	524
1325	D2	525
1326	D2	526
1327	D2	527
1328	D2	528
1329	D2	529
1330	D2	530
1331	D2	531
1332	D2	532
1333	D2	533
1334	D2	534
1335	D2	535
1336	D2	536
1337	D2	537
1338	D2	538
1339	D2	539
1340	D2	540
1341	D2	541
1342	D2	542
1343	D2	543
1344	D2	544
1345	D2	545
1346	D2	546
1347	D2	547
1348	D2	548
1349	D2	549
1350	D2	550
1351	D2	551
1352	D2	552
1353	D2	553
1354	D2	554
1355	D2	555
1356	D2	556
1357	D2	557
1358	D2	558
1359	D2	559
1360	D2	560
1361	D2	561
1362	D2	562
1363	D2	563
1364	D2	564
1365	D2	565
1366	D2	566
1367	D2	567
1368	D2	568
1369	D2	569
1370	D2	570
1371	D2	571
1372	D2	572
1373	D2	573
1374	D2	574
1375	D2	575
1376	D2	576
1377	D2	577
1378	D2	578
1379	D2	579
1380	D2	580
1381	D2	581
1382	D2	582
1383	D2	583
1384	D2	584
1385	D2	585
1386	D2	586
1387	D2	587
1388	D2	588
1389	D2	589
1390	D2	590
1391	D2	591
1392	D2	592
1393	D2	593
1394	D2	594
1395	D2	595
1396	D2	596
1397	D2	597
1398	D2	598
1399	D2	599
1400	D2	600
1401	D2	601
1402	D2	602
1403	D2	603
1404	D2	604
1405	D2	605
1406	D2	606
1407	D2	607
1408	D2	608
1409	D2	609
1410	D2	610
1411	D2	611
1412	D2	612
1413	D2	613
1414	D2	614
1415	D2	615
1416	D2	616
1417	D2	617
1418	D2	618
1419	D2	619
1420	D2	620
1421	D2	621
1422	D2	622
1423	D2	623
1424	D2	624
1425	D2	625
1426	D2	626
1427	D2	627
1428	D2	628
1429	D2	629
1430	D2	630
1431	D2	631
1432	D2	632
1433	D2	633
1434	D2	634
1435	D2	635
1436	D2	636
1437	D2	637
1438	D2	638
1439	D2	639
1440	D2	640
1441	D2	641
1442	D2	642
1443	D2	643
1444	D2	644
1445	D2	645
1446	D2	646
1447	D2	647
1448	D2	648
1449	D2	649
1450	D2	650
1451	D2	651
1452	D2	652
1453	D2	653
1454	D2	654
1455	D2	655
1456	D2	656
1457	D2	657
1458	D2	658
1459	D2	659
1460	D2	660
1461	D2	661
1462	D2	662
1463	D2	663
1464	D2	664
1465	D2	665
1466	D2	666
1467	D2	667
1468	D2	668
1469	D2	669
1470	D2	670
1471	D2	671
1472	D2	672
1473	D2	673
1474	D2	674
1475	D2	675
1476	D2	676
1477	D2	677
1478	D2	678
1479	D2	679
1480	D2	680
1481	D2	681
1482	D2	682
1483	D2	683
1484	D2	684
1485	D2	685
1486	D2	686
1487	D2	687
1488	D2	688
1489	D2	689
1490	D2	690
1491	D2	691
1492	D2	692
1493	D2	693
1494	D2	694
1495	D2	695
1496	D2	696
1497	D2	697
1498	D2	698
1499	D2	699
1500	D2	700
1501	D2	701
1502	D2	702
1503	D2	703
1504	D2	704
1505	D2	705
1506	D2	706
1507	D2	707
1508	D2	708
1509	D2	709
1510	D2	710
1511	D2	711
1512	D2	712
1513	D2	713
1514	D2	714
1515	D2	715
1516	D2	716
1517	D2	717
1518	D2	718
1519	D2	719
1520	D2	720
1521	D2	721
1522	D2	722
1523	D2	723
1524	D2	724
1525	D2	725
1526	D2	726
1527	D2	727
1528	D2	728
1529	D2	729
1530	D2	730
1531	D2	731
1532	D2	732
1533	D2	733
1534	D2	734
1535	D2	735
1536	D2	736
1537	D2	737
1538	D2	738
1539	D2	739
1540	D2	740
1541	D2	741
1542	D2	742
1543	D2	743
1544	D2	744
1545	D2	745
1546	D2	746
1547	D2	747
1548	D2	748
1549	D2	749
1550	D2	750
1551	D2	751
1552	D2	752
1553	D2	753
1554	D2	754
1555	D2	755
1556	D2	756
1557	D2	757
1558	D2	758
1559	D2	759
1560	D2	760
1561	D2	761
1562	D2	762
1563	D2	763
1564	D2	764
1565	D2	765
1566	D2	766
1567	D2	767
1568	D2	768
1569	D2	769
1570	D2	770
1571	D2	771
1572	D2	772
1573	D2	773
1574	D2	774
1575	D2	775
1576	D2	776
1577	D2	777
1578	D2	778
1579	D2	779
1580	D2	780
1581	D2	781
1582	D2	782
1583	D2	783
1584	D2	784
1585	D2	785
1586	D2	786
1587	D2	787
1588	D2	788
1589	D2	789
1590	D2	790
1591	D2	791
1592	D2	792
1593	D2	793
1594	D2	794
1595	D2	795
1596	D2	796
1597	D2	797
1598	D2	798
1599	D2	799
\.


--
-- Data for Name: Event_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_Type" (id, event_type_name) FROM stdin;
1	info
3	error
4	critical
5	security
6	audit
\.


--
-- Data for Name: Feedback; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Feedback" (id, sender_id, content, created_date, title) FROM stdin;
2	4	The student support service has been incredibly helpful throughout my time at school. The staff is always approachable and ready to listen, offering practical advice and solutions. Whether I had academic concerns or personal challenges, they provided the guidance I needed to stay on track. The workshops and counseling sessions have been particularly beneficial, helping me improve my study habits and manage stress. I truly appreciate the care and attention they give to every student.	2024-09-21 03:49:37+07	Good service
\.


--
-- Data for Name: Log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Log" (id, user_id, event_id, description, "timestamp") FROM stdin;
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, ticket_id, sender_id, message_details, created_date) FROM stdin;
1	3	1	Hi, I am waiting for you!	2024-09-23 03:27:05+07
5	34	1	I have just created this ticket	2024-09-23 22:46:57.466+07
6	35	1	I have just created this ticket	2024-09-24 02:54:40.96+07
8	3	1	Hi	2024-09-24 12:26:05.665+07
9	3	1	This is the 3rd message	2024-09-24 12:26:30.697+07
10	3	1	This is the 4th message	2024-09-24 12:26:54.757+07
11	3	1	This is the 5th message	2024-09-24 12:26:58.349+07
12	3	1	This is the 6th message	2024-09-24 12:27:02.569+07
13	3	1	this is the msg that I use jwt	2024-09-24 13:04:50.502+07
14	3	1	8th msg	2024-09-24 13:46:14.314+07
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, sender_id, content, created_date, title) FROM stdin;
2	16	Dear Resident,\r\nPlease be advised that maintenance work is scheduled in Dormitory Block A on September 25th, 2024, from 10:00 AM to 2:00 PM. Water and electricity will be temporarily unavailable during this time. We apologize for any inconvenience caused.\r\n\r\nBest regards,\r\nStudent Affairs Office	2024-09-21 14:15:13+07	New Campus Cafeteria Opening on October 1st
5	16	Dear Students,\r\n\r\nWe are glad to announce Call for application for tuition fee reduction for domestic students in academic year 2024/25 (attached file) published at https://vgu.edu.vn/vi/chinh-sach-giam-hoc-phi\r\nThis policy applies for Vietnamese students only.\r\n\r\nIf you have any question, please don’t hesitate to contact and submit your application documents to Ms Le Thi Hanh, Deputy head of Academic and Student Affairs Department (ASA) by 31/10/2024 (Tel: +84-274 222 0990, Ext. 70132) or meet her in person at room 218, ASA, Academic Building, 2nd floor, Vanh Dai 4 Street, Quarter 4, Thoi Hoa Ward, Ben Cat City, Binh Duong Province.\r\n\r\nFor the students in the campus in Ho Chi Minh City, feel free to have your Faculty Assistant to pass your applications to Ms Hanh.  \r\nOnly hard copies of application documents are accepted.\r\n\r\n\r\nBest Regards,\r\nStudent Affairs Team	2024-09-24 04:13:31+07	Call for application for tuition fee reduction for domestic students in academic year 2024/25
10	16	Dear Students,\r\n\r\n\r\nWe hope this message finds you well. We are pleased to inform you that, in observance of Vietnamese National Day, you will have a 4-day holiday this year, from Saturday, August 31, 2024, to Tuesday, September 3, 2024. This break includes the official National Day holiday as well as the regular weekend days.\r\n\r\n\r\nPlease take this time to rest and enjoy the holiday. Classes and university operations will resume as usual on Wednesday, September 4, 2024.\r\n\r\n\r\nWe wish you a pleasant and restful break.\r\n\r\nBest Regards,\r\n\r\nStudent Affairs Team	2024-08-20 04:14:12+07	Public Holiday - Vietnamese National Day Announcement (02.09.2024)
\.


--
-- Data for Name: Notification_Audience; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification_Audience" (notification_id, role_id) FROM stdin;
2	4
2	1
2	2
5	4
10	4
\.


--
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rating" (ticket_id, rating_score, created_date, id) FROM stdin;
3	4	2024-09-24 03:58:56.004+07	19
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Role" (id, role_name) FROM stdin;
1	Admin
2	Dorm Staff
3	Student Affairs
4	Student
\.


--
-- Data for Name: Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket" (id, ticket_type_id, content, audience_type_id, ticket_status_id, created_date, ended_date, subject) FROM stdin;
3	6	The faucet in room 661 of the orange dormitory (D1) is broken. \r\nCould you please help fix it?\r\nThank you.	1	3	2024-09-22 19:20:32+07	2024-09-23 10:30:18+07	Broken Faucet
35	2	In the morning, while we are studying...\r\nA stranger person stepped into the class and suddenly ... :(	2	1	2024-09-24 02:54:40.96+07	\N	Some one has fought the lectuer
34	4	I LOST MY ITEMS	2	1	2024-09-23 22:46:57.466+07	\N	I lost my room key
\.


--
-- Data for Name: Ticket_Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Role" (role_id, ticket_type_id, can_create, can_read, can_update, can_delete) FROM stdin;
1	1	f	t	f	t
2	6	f	t	t	f
2	5	f	t	t	f
2	3	f	t	t	f
2	1	f	t	t	f
2	4	f	t	t	f
2	9	f	t	t	f
2	7	f	t	t	f
1	2	f	t	t	t
1	3	f	t	t	t
1	4	f	t	t	t
1	5	f	t	t	t
1	6	f	t	t	t
1	7	f	t	t	t
1	9	f	t	t	t
3	1	f	t	t	f
2	2	f	t	t	f
3	2	f	t	t	f
3	3	f	t	t	f
3	4	f	t	t	f
3	5	f	t	t	f
3	6	f	f	f	f
3	7	f	t	t	f
3	9	f	t	t	f
4	1	t	t	t	f
4	2	t	t	t	f
4	3	t	t	t	f
4	4	t	t	t	f
4	5	t	t	t	f
4	6	t	t	t	f
4	7	t	t	t	f
4	9	t	t	t	f
\.


--
-- Data for Name: Ticket_Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Status" (id, status_name) FROM stdin;
1	pending
2	in progress
3	done
4	cancelled
\.


--
-- Data for Name: Ticket_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Type" (id, ticket_type_name, priority) FROM stdin;
1	Health problems	1
2	Violence	1
3	Harassment 	1
4	Lost items	2
5	Found items	2
7	Scam	3
6	Dormitory issues	2
9	Other	3
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, fullname, email, role_id, password, gender, created_date, program, dorm_id, phone_number, intake, place_of_birth, date_of_birth) FROM stdin;
1	17965	Bá Nguyễn Quốc Anh	17965@student.vgu.edu.vn	4	$2a$10$JIj7KHy.lIc70Ve1yf0oZOhB4wCZ7rZ1RmNqjYMHH89XC6bvp/2R6	Male	2024-09-18 16:40:49+07	Computer Science	663	08123124314214	2020	TP Hồ Chí Minh	2002-03-08
4	18812	Vũ Hoàng Tuấn Anh	18812@student.vgu.edu.vn	4	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 16:40:50+07	Computer Science	663	0923232323	2020	Tỉnh Thái Bình	2002-04-20
13	10001	Nguyễn Nguyên Vũ	10001@staff.vgu.edu.vn	2	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 17:47:59+07		1	0122312381		TP Thủ Dầu Một	1992-10-20
8	10000	Trần Thị Hương	10000@student.vgu.edu.vn	4	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Female	2024-09-18 17:43:25+07	Business Administration	839	0123912300	2022	TP Hồ Chí Minh	2004-09-18
16	10002	Trần Văn Sinh	10002@staff.vgu.edu.vn	3	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 23:44:28+07	\N	1	0992292929	\N	Tỉnh Thái Bình	1980-06-22
19	10003	Phan Thị Hà	10003@admin.vgu.edu.vn	1	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Female	2024-09-18 23:46:31+07	\N	1	0991009990	\N	Tỉnh Thái Bình	1982-08-12
\.


--
-- Data for Name: User_Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User_Ticket" (user_id, ticket_id) FROM stdin;
1	3
13	3
1	34
1	35
\.


--
-- Name: Announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Announcement_id_seq"', 1, true);


--
-- Name: Attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Attachment_id_seq"', 17, true);


--
-- Name: Audience_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Audience_Type_id_seq"', 2, true);


--
-- Name: Dorm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Dorm_id_seq"', 1599, true);


--
-- Name: Event_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_Type_id_seq"', 6, true);


--
-- Name: Feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Feedback_id_seq"', 2, true);


--
-- Name: Log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Log_id_seq"', 1, false);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 10, true);


--
-- Name: Rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rating_id_seq"', 19, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 5, true);


--
-- Name: Ticket_Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Comment_id_seq"', 14, true);


--
-- Name: Ticket_Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Status_id_seq"', 4, true);


--
-- Name: Ticket_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Type_id_seq"', 9, true);


--
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 36, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 19, true);


--
-- Name: Announcement Announcement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_pkey" PRIMARY KEY (id);


--
-- Name: Attachment Attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_pkey" PRIMARY KEY (id);


--
-- Name: Attachment Attachment_url_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_url_key" UNIQUE (url);


--
-- Name: Audience_Type Audience_Type_audience_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audience_Type"
    ADD CONSTRAINT "Audience_Type_audience_type_name_key" UNIQUE (audience_type_name);


--
-- Name: Audience_Type Audience_Type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audience_Type"
    ADD CONSTRAINT "Audience_Type_pkey" PRIMARY KEY (id);


--
-- Name: Dorm Dorm_area_room_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dorm"
    ADD CONSTRAINT "Dorm_area_room_key" UNIQUE (area, room);


--
-- Name: Dorm Dorm_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dorm"
    ADD CONSTRAINT "Dorm_pkey" PRIMARY KEY (id);


--
-- Name: Event_Type Event_Type_event_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_Type"
    ADD CONSTRAINT "Event_Type_event_type_name_key" UNIQUE (event_type_name);


--
-- Name: Event_Type Event_Type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Event_Type"
    ADD CONSTRAINT "Event_Type_pkey" PRIMARY KEY (id);


--
-- Name: Feedback Feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT "Feedback_pkey" PRIMARY KEY (id);


--
-- Name: Log Log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_pkey" PRIMARY KEY (id);


--
-- Name: Notification_Audience Notification_Audience_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Audience"
    ADD CONSTRAINT "Notification_Audience_pkey" PRIMARY KEY (notification_id, role_id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Rating Rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_pkey" PRIMARY KEY (id);


--
-- Name: Rating Rating_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_ticket_id_key" UNIQUE (ticket_id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_role_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_role_name_key" UNIQUE (role_name);


--
-- Name: Message Ticket_Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Ticket_Comment_pkey" PRIMARY KEY (id);


--
-- Name: Ticket_Role Ticket_Role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Role"
    ADD CONSTRAINT "Ticket_Role_pkey" PRIMARY KEY (role_id, ticket_type_id);


--
-- Name: Ticket_Status Ticket_Status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Status"
    ADD CONSTRAINT "Ticket_Status_pkey" PRIMARY KEY (id);


--
-- Name: Ticket_Status Ticket_Status_status_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Status"
    ADD CONSTRAINT "Ticket_Status_status_name_key" UNIQUE (status_name);


--
-- Name: Ticket_Type Ticket_Type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Type"
    ADD CONSTRAINT "Ticket_Type_pkey" PRIMARY KEY (id);


--
-- Name: Ticket_Type Ticket_Type_ticket_type_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Type"
    ADD CONSTRAINT "Ticket_Type_ticket_type_name_key" UNIQUE (ticket_type_name);


--
-- Name: Ticket Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);


--
-- Name: User_Ticket User_Ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Ticket"
    ADD CONSTRAINT "User_Ticket_pkey" PRIMARY KEY (user_id, ticket_id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User User_username_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_email_key" UNIQUE (username, email);


--
-- Name: Announcement Announcement_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Announcement"
    ADD CONSTRAINT "Announcement_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Attachment Attachment_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attachment"
    ADD CONSTRAINT "Attachment_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Feedback Feedback_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Feedback"
    ADD CONSTRAINT "Feedback_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id) ON UPDATE SET NULL ON DELETE SET NULL NOT VALID;


--
-- Name: Log Log_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public."Event_Type"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Log Log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Message Message_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Message Message_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Notification_Audience Notification_Audience_notification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Audience"
    ADD CONSTRAINT "Notification_Audience_notification_id_fkey" FOREIGN KEY (notification_id) REFERENCES public."Notification"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Notification_Audience Notification_Audience_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Audience"
    ADD CONSTRAINT "Notification_Audience_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Notification Notification_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Rating Rating_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Ticket_Role Ticket_Role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Role"
    ADD CONSTRAINT "Ticket_Role_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Ticket_Role Ticket_Role_ticket_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Role"
    ADD CONSTRAINT "Ticket_Role_ticket_type_id_fkey" FOREIGN KEY (ticket_type_id) REFERENCES public."Ticket_Type"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Ticket Ticket_audience_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_audience_type_id_fkey" FOREIGN KEY (audience_type_id) REFERENCES public."Audience_Type"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Ticket Ticket_ticket_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticket_status_id_fkey" FOREIGN KEY (ticket_status_id) REFERENCES public."Ticket_Status"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: Ticket Ticket_ticket_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticket_type_id_fkey" FOREIGN KEY (ticket_type_id) REFERENCES public."Ticket_Type"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: User_Ticket User_Ticket_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Ticket"
    ADD CONSTRAINT "User_Ticket_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: User_Ticket User_Ticket_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User_Ticket"
    ADD CONSTRAINT "User_Ticket_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- Name: User User_dorm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_dorm_id_fkey" FOREIGN KEY (dorm_id) REFERENCES public."Dorm"(id) NOT VALID;


--
-- Name: User User_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

