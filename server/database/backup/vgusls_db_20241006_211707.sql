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
    title character varying NOT NULL,
    rating_score integer NOT NULL
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
58	images (1).jpg	http://localhost:3000/api/v1/attachments/26092024-$2a$10$RoQ.ZDDkobKHBzQj.VEOGOdy0bOzOAJ.fBHJZBPwH1BofhmPF7mmW.jpg	2024-09-26 17:08:42.687+07	62	image/jpeg
62	221205091646-winter-cold-stock.jpg	http://localhost:3000/api/v1/attachments/27092024-$2a$10$wFhRzu9Pg40KZaBto0b0h.XirfWPuTAL2oikeI8fwpvzHFDfGKDe.jpg	2024-09-27 06:46:04.288+07	67	image/jpeg
63	images (1).jpg	http://localhost:3000/api/v1/attachments/27092024-$2a$10$r.uqe8kD6ZkAVUHbdhJfecME.Dlt4ADFf1mw16Sw25BlRORD.O6.jpg	2024-09-27 06:47:13.237+07	68	image/jpeg
64	Thief-Steals-Laptop--Sends-Apology-Email-To-Owner1200_635f9013b9f42.jpeg	http://localhost:3000/api/v1/attachments/27092024-$2a$10$nyksaY8SrfirWqqnQS.vrOCnKK.gMguYltBeCVqUN3s4n40IWlAK2.jpeg	2024-09-27 06:47:43.6+07	69	image/jpeg
65	221205091646-winter-cold-stock.jpg	http://localhost:3000/api/v1/attachments/27092024-$2a$10$FB7Oab3gwbWFHU5Hnmt8e.7ebpyoqASWelLgxe4wB3K3D3OnLR.Z2.jpg	2024-09-27 22:40:32.547+07	70	image/jpeg
66	s24-ultra6-black.png	http://localhost:3000/api/v1/attachments/30092024-$2a$10$Bsac8eRgiKqQCF6g4ooF.2S6BptnSG9Kk0PU4jILx6gmNAZIzai.png	2024-09-30 11:35:50.58+07	71	image/png
67	s24-ultra6-black.png	http://localhost:3000/api/v1/attachments/30092024-$2a$10$veiFYQau.2oI1cs0bx.rVubehvlqwzYQ.2TzbnAIlhogR0GhV2PcG.png	2024-09-30 19:17:56.568+07	72	image/png
14	z5749231140673_65fca20e9bdb4509ef509e6e68c3ed4f.jpg	http://localhost:3000/api/v1/attachments/z5749231140673_65fca20e9bdb4509ef509e6e68c3ed4f.jpg	2024-09-23 22:46:57.466+07	34	image/jpeg
15	5812146838664.mp4	http://localhost:3000/api/v1/attachments/5812146838664.mp4	2024-09-23 22:46:57.466+07	34	video/mp4
16	crying_emoji.png	http://localhost:3000/api/v1/attachments/crying_emoji.png	2024-09-24 02:54:40.96+07	35	image/png
18	221205091646-winter-cold-stock.jpg	http://localhost:3000/api/v1/attachments/221205091646-winter-cold-stock.jpg	2024-09-24 21:23:07.067+07	37	image/jpeg
19	Thief-Steals-Laptop--Sends-Apology-Email-To-Owner1200_635f9013b9f42.jpeg	http://localhost:3000/api/v1/attachments/Thief-Steals-Laptop--Sends-Apology-Email-To-Owner1200_635f9013b9f42.jpeg	2024-09-25 00:24:02.043+07	38	image/jpeg
20	images.jpg	http://localhost:3000/api/v1/attachments/images.jpg	2024-09-25 21:33:04.195+07	39	image/jpeg
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

COPY public."Feedback" (id, sender_id, content, created_date, title, rating_score) FROM stdin;
2	4	The student support service has been incredibly helpful throughout my time at school. The staff is always approachable and ready to listen, offering practical advice and solutions. Whether I had academic concerns or personal challenges, they provided the guidance I needed to stay on track. The workshops and counseling sessions have been particularly beneficial, helping me improve my study habits and manage stress. I truly appreciate the care and attention they give to every student.	2024-09-21 03:49:37+07	Good service	5
4	1	I am so happy, let get it	2024-09-24 21:24:36.967+07	Working good as Student Role	5
6	13	testtttt2	2024-09-26 13:04:59.742+07	test	2
7	4	iasjdisajdiasdj	2024-09-26 13:06:26.62+07	student feed	4
\.


--
-- Data for Name: Log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Log" (id, user_id, event_id, description, "timestamp") FROM stdin;
283	19	1	User is getting all roles	2024-09-28 01:18:12.621+07
287	19	1	User is getting all roles	2024-09-28 01:18:57.069+07
291	19	1	Username 10003 is being retrieved	2024-09-28 02:27:09.204+07
294	19	1	Username 10003 has been retrieved	2024-09-28 02:27:11.194+07
299	19	1	User is getting all roles	2024-09-28 02:27:23.799+07
303	19	1	User successfully get all roles	2024-09-28 02:27:35.92+07
308	19	1	User successfully get all roles	2024-09-28 02:28:38.642+07
312	19	1	User successfully get all roles	2024-09-28 02:30:22.946+07
322	19	1	User successfully get all roles	2024-09-28 02:30:51.191+07
329	19	1	All users are being retrieved	2024-09-28 02:38:28.307+07
334	19	1	User is getting all roles	2024-09-28 02:38:42.87+07
351	19	1	User is getting all roles	2024-09-28 02:46:16.95+07
355	19	1	User is getting all roles	2024-09-28 02:47:17.409+07
358	19	4	All users have been retrieved	2024-09-28 02:47:18.679+07
359	19	1	All users are being retrieved	2024-09-28 02:47:19.014+07
364	19	1	User successfully get all roles	2024-09-28 02:47:36.991+07
367	19	1	User is getting all roles	2024-09-28 02:47:41.128+07
369	19	1	User is getting all roles	2024-09-28 02:47:44.718+07
372	19	1	User is getting all roles	2024-09-28 02:47:49.255+07
375	19	1	User is getting all roles	2024-09-28 02:48:00.985+07
378	19	1	User is getting all roles	2024-09-28 02:48:06.223+07
388	19	1	User successfully get all roles	2024-09-28 03:57:17.812+07
392	19	1	User successfully get all roles	2024-09-28 03:58:45.01+07
402	19	1	Username 10003 has been retrieved	2024-09-28 04:14:54.316+07
403	19	1	All users are being retrieved	2024-09-28 04:15:00.28+07
409	19	4	All users have been retrieved	2024-09-28 04:42:40.216+07
413	19	1	All users are being retrieved	2024-09-28 04:54:43.29+07
417	19	4	User is getting all feedbacks	2024-09-28 13:10:37.01+07
422	19	1	All users are being retrieved	2024-09-28 13:17:04.598+07
428	1	1	Username 17965 has been retrieved	2024-09-28 13:24:29.657+07
432	1	1	Username 17965 is being retrieved	2024-09-28 14:05:06.641+07
436	1	1	Username 17965 has been retrieved	2024-09-28 14:08:37.5+07
437	1	1	Username 17965 is being retrieved	2024-09-28 14:08:39.145+07
443	13	1	Username 10001 is being retrieved	2024-09-28 14:18:56.653+07
446	13	1	Username 10001 has been retrieved	2024-09-28 14:19:22.259+07
452	13	1	Username 10001 has been retrieved	2024-09-28 14:19:59.811+07
453	13	1	Username 10001 is being retrieved	2024-09-28 14:20:10.352+07
456	13	1	Username 10001 has been retrieved	2024-09-28 14:20:21.434+07
457	13	1	Username 10001 is being retrieved	2024-09-28 14:20:31.353+07
461	13	1	Username 10001 is being retrieved	2024-09-28 14:22:24.379+07
464	13	1	Username 10001 has been retrieved	2024-09-28 14:22:33.832+07
466	13	1	Username 10001 has been retrieved	2024-09-28 14:23:08.436+07
467	13	1	Username 10001 is being retrieved	2024-09-28 14:23:13.375+07
472	19	5	Username 10003 logged in successfully	2024-09-28 14:23:45.746+07
473	19	1	Username 10003 is being retrieved	2024-09-28 14:23:46.181+07
476	19	1	Username 10003 has been retrieved	2024-09-28 14:24:03.36+07
480	19	1	Username 10003 has been retrieved	2024-09-28 14:24:22.461+07
484	19	1	Username 10003 is being retrieved	2024-09-28 14:27:05.522+07
486	19	1	Username 10003 is being retrieved	2024-09-28 14:27:05.56+07
490	19	4	All users have been retrieved	2024-09-28 14:27:11.475+07
491	19	1	User successfully get all roles	2024-09-28 14:27:11.516+07
492	19	4	User is getting all feedbacks	2024-09-28 14:27:19.582+07
494	19	1	Username 10003 has been retrieved	2024-09-28 14:27:22.63+07
497	19	1	User successfully get all roles	2024-09-28 14:27:37.596+07
500	19	4	All users have been retrieved	2024-09-28 14:27:52.492+07
504	19	1	User is getting all roles	2024-09-28 14:27:58.526+07
509	19	4	All users have been retrieved	2024-09-28 14:28:20.695+07
512	19	1	User successfully get all roles	2024-09-28 14:28:36.832+07
515	19	1	Username 10003 is being retrieved	2024-09-28 14:29:09.592+07
518	19	1	Username 10003 has been retrieved	2024-09-28 14:29:16.353+07
520	19	1	Username 10003 has been retrieved	2024-09-28 14:29:45.478+07
521	19	1	Username 10003 is being retrieved	2024-09-28 14:29:58.156+07
524	19	1	Username 10003 has been retrieved	2024-09-28 14:30:02.416+07
526	19	1	Username 10003 has been retrieved	2024-09-28 14:30:02.491+07
529	19	4	User is getting all feedbacks	2024-09-28 14:44:54.798+07
532	13	5	Username 10001 logged in successfully	2024-09-28 14:48:02.093+07
533	13	1	Username 10001 is being retrieved	2024-09-28 14:48:02.437+07
536	13	1	Username 10001 is being retrieved	2024-09-28 14:51:16.217+07
543	1	1	Username 17965 has been retrieved	2024-09-28 14:55:11.046+07
546	19	5	Username 10003 logged in successfully	2024-09-29 00:02:05.301+07
550	19	1	Username 10003 has been retrieved	2024-09-29 00:10:16.929+07
554	19	5	Username 10003 logged in successfully	2024-09-29 00:20:40.875+07
555	19	1	Username 10003 is being retrieved	2024-09-29 00:20:41.579+07
558	19	1	Username 10003 has been retrieved	2024-09-29 00:20:47.737+07
559	19	1	Username 10003 is being retrieved	2024-09-29 00:20:48.903+07
562	19	1	Username 10003 has been retrieved	2024-09-29 00:20:48.954+07
563	19	1	All users are being retrieved	2024-09-29 00:20:49.948+07
564	19	1	User is getting all roles	2024-09-29 00:20:49.957+07
571	19	1	User successfully get all roles	2024-09-29 00:20:52.814+07
572	19	1	Username 10003 is being retrieved	2024-09-29 00:20:53.68+07
574	19	1	Username 10003 is being retrieved	2024-09-29 00:20:53.691+07
577	19	1	Username 10003 has been retrieved	2024-09-29 00:20:54.08+07
579	1	5	Username 17965 logged in successfully	2024-09-30 01:48:47.146+07
580	1	1	Username 17965 is being retrieved	2024-09-30 01:48:47.56+07
584	4	1	Username 18812 has been retrieved	2024-09-30 01:50:17.647+07
588	4	5	Username 18812 logged in successfully	2024-09-30 01:51:27.195+07
589	4	1	Username 18812 is being retrieved	2024-09-30 01:51:27.599+07
594	4	1	Username 18812 has been retrieved	2024-09-30 01:58:47.787+07
595	4	5	Username 18812 logged in successfully	2024-09-30 01:58:49.598+07
596	4	1	Username 18812 is being retrieved	2024-09-30 01:58:50.057+07
598	13	5	Username 10001 logged in successfully	2024-09-30 02:01:22.496+07
599	13	1	Username 10001 is being retrieved	2024-09-30 02:01:22.885+07
284	19	1	User successfully get all roles	2024-09-28 01:18:12.686+07
288	19	1	User successfully get all roles	2024-09-28 01:18:57.226+07
292	19	1	Username 10003 has been retrieved	2024-09-28 02:27:09.247+07
293	19	1	Username 10003 is being retrieved	2024-09-28 02:27:11.186+07
295	19	1	Username 10003 is being retrieved	2024-09-28 02:27:11.2+07
300	19	1	User successfully get all roles	2024-09-28 02:27:23.862+07
304	19	4	All users have been retrieved	2024-09-28 02:27:36.026+07
309	19	1	All users are being retrieved	2024-09-28 02:30:22.885+07
313	1	5	Username 17965 logged in successfully	2024-09-28 02:30:37.895+07
314	1	1	Username 17965 is being retrieved	2024-09-28 02:30:38.808+07
318	19	1	Username 10003 has been retrieved	2024-09-28 02:30:47.886+07
319	19	1	All users are being retrieved	2024-09-28 02:30:51.139+07
323	19	5	Username 10003 logged in successfully	2024-09-28 02:35:11.525+07
330	19	1	User is getting all roles	2024-09-28 02:38:28.312+07
335	19	1	User successfully get all roles	2024-09-28 02:38:42.937+07
338	19	4	All users have been retrieved	2024-09-28 02:38:50.754+07
352	19	1	User successfully get all roles	2024-09-28 02:46:16.999+07
356	19	1	User successfully get all roles	2024-09-28 02:47:17.45+07
357	19	1	All users are being retrieved	2024-09-28 02:47:18.674+07
360	19	4	All users have been retrieved	2024-09-28 02:47:19.018+07
376	19	1	User successfully get all roles	2024-09-28 02:48:01.022+07
385	19	1	User is getting all roles	2024-09-28 03:52:31.498+07
389	19	1	User is getting all roles	2024-09-28 03:58:31.558+07
400	19	1	Username 10003 has been retrieved	2024-09-28 04:14:54.271+07
404	19	1	User is getting all roles	2024-09-28 04:15:00.283+07
406	19	1	User successfully get all roles	2024-09-28 04:15:00.321+07
410	19	1	User successfully get all roles	2024-09-28 04:42:40.219+07
414	19	1	User is getting all roles	2024-09-28 04:54:43.295+07
418	19	4	User is getting all feedbacks	2024-09-28 13:16:15.69+07
419	19	1	User is getting all roles	2024-09-28 13:16:17.523+07
424	19	1	User is getting all roles	2024-09-28 13:17:04.602+07
429	1	1	Username 17965 is being retrieved	2024-09-28 14:04:55.699+07
433	1	1	Username 17965 has been retrieved	2024-09-28 14:05:06.7+07
439	13	5	Username 10001 logged in successfully	2024-09-28 14:16:54.237+07
440	13	1	Username 10001 is being retrieved	2024-09-28 14:16:54.809+07
444	13	1	Username 10001 has been retrieved	2024-09-28 14:18:56.707+07
448	13	1	Username 10001 has been retrieved	2024-09-28 14:19:22.41+07
449	13	1	Username 10001 is being retrieved	2024-09-28 14:19:25.277+07
454	13	1	Username 10001 has been retrieved	2024-09-28 14:20:10.397+07
459	13	1	Username 10001 is being retrieved	2024-09-28 14:21:20.345+07
462	13	1	Username 10001 has been retrieved	2024-09-28 14:22:24.448+07
463	13	1	Username 10001 is being retrieved	2024-09-28 14:22:33.83+07
469	1	5	Username 17965 logged in successfully	2024-09-28 14:23:32.631+07
470	1	1	Username 17965 is being retrieved	2024-09-28 14:23:32.961+07
474	19	1	Username 10003 has been retrieved	2024-09-28 14:23:46.225+07
478	19	1	Username 10003 has been retrieved	2024-09-28 14:24:03.5+07
481	19	5	Username 10003 logged in successfully	2024-09-28 14:26:53.42+07
482	19	1	Username 10003 is being retrieved	2024-09-28 14:26:53.808+07
485	19	1	Username 10003 has been retrieved	2024-09-28 14:27:05.557+07
489	19	1	User is getting all roles	2024-09-28 14:27:11.47+07
493	19	1	Username 10003 is being retrieved	2024-09-28 14:27:22.629+07
495	19	1	All users are being retrieved	2024-09-28 14:27:37.501+07
498	19	4	All users have been retrieved	2024-09-28 14:27:37.597+07
501	19	1	User is getting all roles	2024-09-28 14:27:52.417+07
505	19	4	All users have been retrieved	2024-09-28 14:27:58.529+07
507	19	1	All users are being retrieved	2024-09-28 14:28:20.645+07
510	19	1	User successfully get all roles	2024-09-28 14:28:20.696+07
513	19	1	All users are being retrieved	2024-09-28 14:28:36.725+07
516	19	1	Username 10003 has been retrieved	2024-09-28 14:29:09.632+07
517	19	1	Username 10003 is being retrieved	2024-09-28 14:29:16.346+07
522	19	1	Username 10003 has been retrieved	2024-09-28 14:29:58.199+07
523	19	1	Username 10003 is being retrieved	2024-09-28 14:30:02.399+07
527	19	1	Username 10003 is being retrieved	2024-09-28 14:36:48.693+07
530	19	1	User is getting all roles	2024-09-28 14:45:44.342+07
534	13	1	Username 10001 has been retrieved	2024-09-28 14:48:02.576+07
537	1	5	Username 17965 logged in successfully	2024-09-28 14:55:09.214+07
538	1	1	Username 17965 is being retrieved	2024-09-28 14:55:09.531+07
541	1	1	Username 17965 has been retrieved	2024-09-28 14:55:10.876+07
544	19	5	Username 10003 logged in successfully	2024-09-29 00:01:08.943+07
547	19	5	Username 10003 logged in successfully	2024-09-29 00:08:28.506+07
551	19	5	Username 10003 logged in successfully	2024-09-29 00:11:15.403+07
552	19	1	Username 10003 is being retrieved	2024-09-29 00:11:16.085+07
556	19	1	Username 10003 has been retrieved	2024-09-29 00:20:41.623+07
557	19	1	Username 10003 is being retrieved	2024-09-29 00:20:47.733+07
560	19	1	Username 10003 has been retrieved	2024-09-29 00:20:48.904+07
566	19	1	User successfully get all roles	2024-09-29 00:20:50.005+07
567	19	4	User is getting all feedbacks	2024-09-29 00:20:51.386+07
568	19	1	All users are being retrieved	2024-09-29 00:20:52.807+07
569	19	1	User is getting all roles	2024-09-29 00:20:52.811+07
575	19	1	Username 10003 has been retrieved	2024-09-29 00:20:53.692+07
576	19	1	Username 10003 is being retrieved	2024-09-29 00:20:54.078+07
581	1	1	Username 17965 has been retrieved	2024-09-30 01:48:47.626+07
585	4	5	Username 18812 logged in successfully	2024-09-30 01:50:48.955+07
586	4	1	Username 18812 is being retrieved	2024-09-30 01:50:49.565+07
590	4	1	Username 18812 has been retrieved	2024-09-30 01:51:27.649+07
597	4	1	Username 18812 has been retrieved	2024-09-30 01:58:50.062+07
600	13	1	Username 10001 has been retrieved	2024-09-30 02:01:22.934+07
601	16	5	Username 10002 logged in successfully	2024-09-30 02:01:29.282+07
602	16	1	Username 10002 is being retrieved	2024-09-30 02:01:29.582+07
603	16	1	Username 10002 has been retrieved	2024-09-30 02:01:29.585+07
604	16	1	Username 10002 is being retrieved	2024-09-30 02:01:45.037+07
605	16	1	Username 10002 has been retrieved	2024-09-30 02:01:45.085+07
606	16	1	Username 10002 is being retrieved	2024-09-30 02:01:45.089+07
607	16	1	Username 10002 has been retrieved	2024-09-30 02:01:45.131+07
608	16	1	Username 10002 is being retrieved	2024-09-30 03:26:33.475+07
609	16	1	Username 10002 has been retrieved	2024-09-30 03:26:33.515+07
285	19	1	User is getting all roles	2024-09-28 01:18:43.19+07
289	19	5	Username 10003 logged in successfully	2024-09-28 01:43:33.66+07
296	19	1	Username 10003 has been retrieved	2024-09-28 02:27:11.268+07
297	19	1	All users are being retrieved	2024-09-28 02:27:23.796+07
301	19	1	All users are being retrieved	2024-09-28 02:27:35.864+07
305	19	1	User is getting all roles	2024-09-28 02:28:36.861+07
307	19	1	User is getting all roles	2024-09-28 02:28:38.639+07
310	19	1	User is getting all roles	2024-09-28 02:30:22.889+07
315	1	1	Username 17965 has been retrieved	2024-09-28 02:30:38.849+07
316	19	5	Username 10003 logged in successfully	2024-09-28 02:30:47.145+07
317	19	1	Username 10003 is being retrieved	2024-09-28 02:30:47.882+07
320	19	4	All users have been retrieved	2024-09-28 02:30:51.144+07
331	19	1	User successfully get all roles	2024-09-28 02:38:28.356+07
336	19	4	All users have been retrieved	2024-09-28 02:38:42.94+07
337	19	1	All users are being retrieved	2024-09-28 02:38:50.75+07
349	19	1	All users are being retrieved	2024-09-28 02:46:16.946+07
353	19	1	All users are being retrieved	2024-09-28 02:47:17.406+07
361	19	1	User is getting all roles	2024-09-28 02:47:34.764+07
363	19	1	User is getting all roles	2024-09-28 02:47:36.989+07
370	19	1	User successfully get all roles	2024-09-28 02:47:44.72+07
381	19	5	Username 10003 logged in successfully	2024-09-28 03:24:02.468+07
386	19	1	User successfully get all roles	2024-09-28 03:52:31.55+07
390	19	1	User successfully get all roles	2024-09-28 03:58:31.613+07
399	19	1	Username 10003 is being retrieved	2024-09-28 04:14:54.27+07
407	19	1	All users are being retrieved	2024-09-28 04:42:40.157+07
411	19	1	User is getting all roles	2024-09-28 04:50:44.407+07
415	19	1	User successfully get all roles	2024-09-28 04:54:43.344+07
420	19	1	User successfully get all roles	2024-09-28 13:16:17.557+07
425	19	1	User successfully get all roles	2024-09-28 13:17:04.649+07
430	1	1	Username 17965 has been retrieved	2024-09-28 14:04:55.706+07
434	1	1	Username 17965 is being retrieved	2024-09-28 14:05:06.578+07
441	13	1	Username 10001 has been retrieved	2024-09-28 14:16:54.859+07
445	13	1	Username 10001 is being retrieved	2024-09-28 14:19:22.223+07
447	13	1	Username 10001 is being retrieved	2024-09-28 14:19:22.262+07
450	13	1	Username 10001 has been retrieved	2024-09-28 14:19:25.282+07
451	13	1	Username 10001 is being retrieved	2024-09-28 14:19:59.635+07
455	13	1	Username 10001 is being retrieved	2024-09-28 14:20:21.365+07
458	13	1	Username 10001 has been retrieved	2024-09-28 14:20:31.359+07
460	13	1	Username 10001 has been retrieved	2024-09-28 14:21:20.387+07
465	13	1	Username 10001 is being retrieved	2024-09-28 14:23:08.365+07
468	13	1	Username 10001 has been retrieved	2024-09-28 14:23:13.381+07
471	1	1	Username 17965 has been retrieved	2024-09-28 14:23:33.002+07
475	19	1	Username 10003 is being retrieved	2024-09-28 14:24:03.327+07
477	19	1	Username 10003 is being retrieved	2024-09-28 14:24:03.364+07
479	19	1	Username 10003 is being retrieved	2024-09-28 14:24:22.368+07
483	19	1	Username 10003 has been retrieved	2024-09-28 14:26:53.859+07
487	19	1	Username 10003 has been retrieved	2024-09-28 14:27:05.602+07
488	19	1	All users are being retrieved	2024-09-28 14:27:11.468+07
496	19	1	User is getting all roles	2024-09-28 14:27:37.504+07
499	19	1	All users are being retrieved	2024-09-28 14:27:52.402+07
502	19	1	User successfully get all roles	2024-09-28 14:27:52.5+07
503	19	1	All users are being retrieved	2024-09-28 14:27:58.521+07
506	19	1	User successfully get all roles	2024-09-28 14:27:58.531+07
508	19	1	User is getting all roles	2024-09-28 14:28:20.648+07
511	19	1	User is getting all roles	2024-09-28 14:28:36.715+07
514	19	4	All users have been retrieved	2024-09-28 14:28:36.844+07
519	19	1	Username 10003 is being retrieved	2024-09-28 14:29:45.403+07
525	19	1	Username 10003 is being retrieved	2024-09-28 14:30:02.42+07
528	19	1	Username 10003 has been retrieved	2024-09-28 14:36:48.737+07
531	19	1	User successfully get all roles	2024-09-28 14:45:44.384+07
535	13	1	Username 10001 has been retrieved	2024-09-28 14:51:16.266+07
539	1	1	Username 17965 has been retrieved	2024-09-28 14:55:09.569+07
540	1	1	Username 17965 is being retrieved	2024-09-28 14:55:10.869+07
542	1	1	Username 17965 is being retrieved	2024-09-28 14:55:10.88+07
545	19	5	Username 10003 logged in successfully	2024-09-29 00:01:24.51+07
548	19	5	Username 10003 logged in successfully	2024-09-29 00:10:16.131+07
549	19	1	Username 10003 is being retrieved	2024-09-29 00:10:16.894+07
553	19	1	Username 10003 has been retrieved	2024-09-29 00:11:16.12+07
561	19	1	Username 10003 is being retrieved	2024-09-29 00:20:48.908+07
565	19	4	All users have been retrieved	2024-09-29 00:20:49.96+07
570	19	4	All users have been retrieved	2024-09-29 00:20:52.812+07
573	19	1	Username 10003 has been retrieved	2024-09-29 00:20:53.684+07
578	19	5	Username 10003 logged in failed due to wrong credentials information	2024-09-29 00:27:37.304+07
582	4	5	Username 18812 logged in successfully	2024-09-30 01:50:17.031+07
583	4	1	Username 18812 is being retrieved	2024-09-30 01:50:17.606+07
1	19	1	User 10003 has been retrieved	2024-09-27 21:12:36.124+07
2	19	1	Username 10003 is being retrieved	2024-09-27 21:39:43.259+07
3	19	1	Username 10003 has been retrieved	2024-09-27 21:39:43.294+07
4	19	1	Username 10003 is being retrieved	2024-09-27 21:39:56.272+07
5	19	1	Username 10003 has been retrieved	2024-09-27 21:39:56.33+07
6	19	1	All users are being retrieved	2024-09-27 21:40:16.818+07
7	19	1	All users have been retrieved	2024-09-27 21:40:16.853+07
8	19	1	Username 10003 is changing the password	2024-09-27 21:41:47.914+07
9	19	1	Username 10003 has changed the password	2024-09-27 21:41:48.278+07
10	19	1	User is changing the password	2024-09-27 21:43:23.674+07
12	19	1	User is changing the password	2024-09-27 21:44:30.719+07
13	19	3	User has entered the wrong current password	2024-09-27 21:44:30.833+07
14	19	1	User is changing the password	2024-09-27 21:45:07.081+07
15	19	1	User has changed the password	2024-09-27 21:45:07.247+07
16	19	1	Username 10003 is changing the phone number	2024-09-27 21:46:28.304+07
17	19	1	Username 10003 has changed the phone number	2024-09-27 21:46:28.337+07
587	4	1	Username 18812 has been retrieved	2024-09-30 01:50:49.622+07
591	4	5	Username 18812 logged in failed due to wrong credentials information	2024-09-30 01:58:40.484+07
592	4	5	Username 18812 logged in successfully	2024-09-30 01:58:47.35+07
593	4	1	Username 18812 is being retrieved	2024-09-30 01:58:47.741+07
18	19	1	User is changing the password	2024-09-27 21:50:51.601+07
19	19	3	User has entered the wrong current password	2024-09-27 21:50:51.71+07
20	19	1	User is changing the password	2024-09-27 21:50:57.553+07
21	19	1	User has changed the password	2024-09-27 21:50:57.682+07
22	19	1	User is changing the password	2024-09-27 21:51:03.846+07
23	19	1	User has changed the password	2024-09-27 21:51:03.973+07
25	4	1	User is changing the phone number	2024-09-27 21:56:39.623+07
24	4	4	User has changed the phone number	2024-09-27 21:56:39.658+07
26	4	1	User is changing the password	2024-09-27 21:57:18.177+07
27	4	1	User has changed the password	2024-09-27 21:57:18.517+07
28	4	1	User is changing the password	2024-09-27 21:57:25.284+07
29	4	3	User has entered the wrong current password	2024-09-27 21:57:25.347+07
30	4	1	User is changing the password	2024-09-27 21:57:31.3+07
31	4	1	User has changed the password	2024-09-27 21:57:31.421+07
32	19	1	Username 10003 is being retrieved	2024-09-27 21:58:52.737+07
33	19	1	Username 10003 has been retrieved	2024-09-27 21:58:52.803+07
34	19	1	Username 10003 is being retrieved	2024-09-27 21:59:01.243+07
35	19	1	Username 10003 has been retrieved	2024-09-27 21:59:01.247+07
36	19	1	Username 10003 is being retrieved	2024-09-27 21:59:01.251+07
37	19	1	Username 10003 has been retrieved	2024-09-27 21:59:01.396+07
38	19	1	All users are being retrieved	2024-09-27 21:59:11.327+07
39	19	4	All users have been retrieved	2024-09-27 21:59:11.385+07
40	19	4	Username tunacse has been created	2024-09-27 22:00:03.007+07
41	19	4	An email has been sent to vhtuananh020402@gmail.com	2024-09-27 22:00:05.588+07
42	19	1	All users are being retrieved	2024-09-27 22:00:20.342+07
43	19	4	All users have been retrieved	2024-09-27 22:00:20.385+07
44	19	1	All users are being retrieved	2024-09-27 22:00:21.374+07
45	19	4	All users have been retrieved	2024-09-27 22:00:21.382+07
46	19	1	All users are being retrieved	2024-09-27 22:01:08.275+07
47	19	4	All users have been retrieved	2024-09-27 22:01:08.334+07
48	19	3	Failed to delete a user	2024-09-27 22:01:36.72+07
49	19	1	User is deleting a user	2024-09-27 22:02:41.3+07
50	19	4	User has deleted a user	2024-09-27 22:02:41.39+07
51	19	1	All users are being retrieved	2024-09-27 22:02:41.551+07
52	19	4	All users have been retrieved	2024-09-27 22:02:41.56+07
53	19	4	Username tunacse has been created	2024-09-27 22:03:44.922+07
54	19	4	An email has been sent to vhtuananh020402@gmail.com	2024-09-27 22:03:47.012+07
55	19	1	All users are being retrieved	2024-09-27 22:03:47.166+07
56	19	4	All users have been retrieved	2024-09-27 22:03:47.206+07
57	19	1	User ID #29 dorm info is being changed	2024-09-27 22:04:18.546+07
58	19	4	User ID #29 dorm info was changed	2024-09-27 22:04:18.715+07
59	19	1	All users are being retrieved	2024-09-27 22:04:18.889+07
60	19	4	All users have been retrieved	2024-09-27 22:04:18.893+07
61	19	1	User is changing the role	2024-09-27 22:04:37.057+07
62	19	4	User has changed the role	2024-09-27 22:04:37.25+07
63	19	1	All users are being retrieved	2024-09-27 22:04:37.395+07
64	19	4	All users have been retrieved	2024-09-27 22:04:37.4+07
65	19	1	User ID #29 role is being changed	2024-09-27 22:06:40.317+07
66	19	4	User ID #29 role was changed	2024-09-27 22:06:40.512+07
67	19	1	All users are being retrieved	2024-09-27 22:06:40.668+07
68	19	4	All users have been retrieved	2024-09-27 22:06:40.673+07
69	19	1	User is editing profile	2024-09-27 22:07:15.919+07
70	19	4	User has edited profile	2024-09-27 22:07:16.007+07
71	19	1	All users are being retrieved	2024-09-27 22:07:16.181+07
72	19	4	All users have been retrieved	2024-09-27 22:07:16.186+07
73	19	1	User is editing user id #29 profile	2024-09-27 22:09:07.735+07
74	19	4	User has edited user id #29 profile	2024-09-27 22:09:07.908+07
75	19	1	All users are being retrieved	2024-09-27 22:09:08.057+07
76	19	4	All users have been retrieved	2024-09-27 22:09:08.065+07
77	19	1	User is deleting user id #29	2024-09-27 22:10:39.545+07
78	19	4	User has deleted user id #29	2024-09-27 22:10:39.649+07
79	19	1	All users are being retrieved	2024-09-27 22:10:39.828+07
80	19	4	All users have been retrieved	2024-09-27 22:10:39.836+07
81	19	1	Username 10003 is being retrieved	2024-09-27 22:10:59.671+07
82	19	1	Username 10003 has been retrieved	2024-09-27 22:10:59.84+07
83	19	1	User is changing the phone number	2024-09-27 22:11:07.039+07
84	19	4	User has changed the phone number	2024-09-27 22:11:07.041+07
85	19	1	Username 10003 is being retrieved	2024-09-27 22:11:07.093+07
86	19	1	Username 10003 has been retrieved	2024-09-27 22:11:07.094+07
87	19	1	User is changing the password	2024-09-27 22:11:44.578+07
88	19	1	User has changed the password	2024-09-27 22:11:44.753+07
89	19	1	Username 10003 is being retrieved	2024-09-27 22:11:56.004+07
90	19	1	Username 10003 has been retrieved	2024-09-27 22:11:56.142+07
91	1	5	Username 17965 logged in failed due to wrong credentials information	2024-09-27 22:13:42.885+07
92	1	5	Username 17965 logged in successfully	2024-09-27 22:14:15.431+07
93	1	1	Username 17965 is being retrieved	2024-09-27 22:14:16.17+07
94	1	1	Username 17965 has been retrieved	2024-09-27 22:14:16.219+07
95	1	1	Username 17965 is being retrieved	2024-09-27 22:14:26.267+07
96	1	1	Username 17965 has been retrieved	2024-09-27 22:14:26.309+07
97	1	1	Username 17965 is being retrieved	2024-09-27 22:14:26.312+07
98	1	1	Username 17965 has been retrieved	2024-09-27 22:14:26.458+07
99	1	1	Username 17965 is being retrieved	2024-09-27 22:14:31.382+07
100	1	1	Username 17965 has been retrieved	2024-09-27 22:14:31.388+07
102	19	5	Username 10003 logged in successfully	2024-09-27 22:21:01.683+07
103	19	1	Username 10003 is being retrieved	2024-09-27 22:21:02.436+07
104	19	1	Username 10003 has been retrieved	2024-09-27 22:21:02.482+07
112	19	5	Username 10003 logged in successfully	2024-09-27 22:39:22.029+07
113	19	1	Username 10003 is being retrieved	2024-09-27 22:39:22.66+07
114	19	1	Username 10003 has been retrieved	2024-09-27 22:39:22.722+07
115	1	5	Username 17965 logged in successfully	2024-09-27 22:39:33.177+07
116	1	1	Username 17965 is being retrieved	2024-09-27 22:39:33.853+07
117	1	1	Username 17965 has been retrieved	2024-09-27 22:39:33.897+07
118	1	1	Username 17965 is being retrieved	2024-09-27 22:39:35.455+07
119	1	1	Username 17965 has been retrieved	2024-09-27 22:39:35.462+07
120	1	1	Username 17965 is being retrieved	2024-09-27 22:39:35.468+07
121	1	1	Username 17965 has been retrieved	2024-09-27 22:39:35.614+07
122	1	1	Username 17965 is being retrieved	2024-09-27 22:39:36.891+07
123	1	1	Username 17965 has been retrieved	2024-09-27 22:39:36.892+07
124	1	4	User is creating a ticket	2024-09-27 22:39:40+07
125	1	4	User has created a ticket	2024-09-27 22:39:40+07
126	13	5	Username 10001 logged in successfully	2024-09-27 22:40:57.393+07
127	13	1	Username 10001 is being retrieved	2024-09-27 22:40:58.052+07
128	13	1	Username 10001 has been retrieved	2024-09-27 22:40:58.11+07
129	13	1	Username 10001 is being retrieved	2024-09-27 22:41:00.338+07
130	13	1	Username 10001 has been retrieved	2024-09-27 22:41:00.342+07
131	13	1	Username 10001 is being retrieved	2024-09-27 22:41:00.348+07
132	13	1	Username 10001 has been retrieved	2024-09-27 22:41:00.401+07
133	13	4	User is assigning to the ticket	2024-09-27 22:42:35+07
134	13	4	User has assigned to the ticket	2024-09-27 22:42:37+07
109	19	4	User is deleting dorm D2-811	2024-09-27 22:46:49+07
110	19	4	Dorm D2-811 was deleted	2024-09-27 22:46:50+07
108	19	4	Dorm D2-811 was created	2024-09-27 22:46:50+07
107	19	4	User is creating dorm D2-811	2024-09-27 22:46:51+07
136	13	4	User has done the ticket	2024-09-27 22:48:54+07
135	13	4	User is done the ticket	2024-09-27 22:48:54+07
137	1	4	User is rating a ticket #70	2024-09-27 22:51:13.304+07
138	1	4	User has rated the ticket #70	2024-09-27 22:51:13.372+07
142	13	4	User is creating a notification	2024-09-27 22:52:53.429+07
141	13	4	User has created a notification	2024-09-27 22:52:53.496+07
139	13	1	User is getting all roles	2024-09-27 22:53:31+07
140	13	1	User successfully get all roles	2024-09-27 22:53:31+07
143	13	4	User is creating an announcement	2024-09-27 22:53:52.862+07
144	13	4	User has created an announcement	2024-09-27 22:53:52.91+07
146	13	1	Username 10001 is being retrieved	2024-09-27 22:54:05.497+07
145	13	1	Username 10001 has been retrieved	2024-09-27 22:54:05.542+07
147	13	1	User is changing the phone number	2024-09-27 22:54:11.753+07
148	13	4	User has changed the phone number	2024-09-27 22:54:11.755+07
149	13	1	Username 10001 is being retrieved	2024-09-27 22:54:11.791+07
150	13	1	Username 10001 has been retrieved	2024-09-27 22:54:11.8+07
151	13	1	User is changing the password	2024-09-27 22:54:41.99+07
152	13	1	User has changed the password	2024-09-27 22:54:42.369+07
153	1	5	Username 17965 logged in failed due to wrong credentials information	2024-09-27 22:55:02.057+07
154	13	5	Username 10001 logged in successfully	2024-09-27 22:55:07.396+07
155	13	1	Username 10001 is being retrieved	2024-09-27 22:55:07.83+07
156	13	1	Username 10001 has been retrieved	2024-09-27 22:55:07.87+07
157	19	5	Username 10003 logged in successfully	2024-09-27 22:57:02.729+07
158	19	1	Username 10003 is being retrieved	2024-09-27 22:57:03.205+07
159	19	1	Username 10003 has been retrieved	2024-09-27 22:57:03.251+07
160	4	5	Username 18812 logged in successfully	2024-09-27 23:05:21.33+07
161	19	5	Username 10003 logged in successfully	2024-09-27 23:05:39.554+07
162	1	1	Username 17965 is being retrieved	2024-09-27 23:33:07.809+07
163	1	1	Username 17965 has been retrieved	2024-09-27 23:33:07.847+07
164	1	1	Username 17965 is being retrieved	2024-09-27 23:33:11.382+07
165	1	1	Username 17965 has been retrieved	2024-09-27 23:33:11.392+07
166	1	1	Username 17965 is being retrieved	2024-09-27 23:33:11.394+07
167	1	1	Username 17965 has been retrieved	2024-09-27 23:33:11.447+07
168	19	5	Username 10003 logged in successfully	2024-09-27 23:33:18.92+07
169	19	1	Username 10003 is being retrieved	2024-09-27 23:33:19.333+07
170	19	1	Username 10003 has been retrieved	2024-09-27 23:33:19.335+07
171	19	1	All users are being retrieved	2024-09-27 23:38:09.873+07
173	19	1	User is getting all roles	2024-09-27 23:38:09.885+07
172	19	4	All users have been retrieved	2024-09-27 23:38:09.946+07
174	19	1	User successfully get all roles	2024-09-27 23:38:09.96+07
175	19	1	All users are being retrieved	2024-09-27 23:43:28.157+07
177	19	1	User is getting all roles	2024-09-27 23:43:28.165+07
176	19	4	All users have been retrieved	2024-09-27 23:43:28.24+07
178	19	1	User successfully get all roles	2024-09-27 23:43:28.258+07
179	19	1	All users are being retrieved	2024-09-27 23:45:04.386+07
180	19	4	All users have been retrieved	2024-09-27 23:45:04.454+07
181	19	1	All users are being retrieved	2024-09-27 23:45:04.762+07
182	19	4	All users have been retrieved	2024-09-27 23:45:04.774+07
183	19	1	User is getting all roles	2024-09-27 23:45:04.778+07
184	19	1	User successfully get all roles	2024-09-27 23:45:04.824+07
185	19	1	User ID #19 role is being changed	2024-09-27 23:45:14.402+07
186	19	4	User ID #19 role was changed	2024-09-27 23:45:14.407+07
187	19	1	All users are being retrieved	2024-09-27 23:45:14.532+07
188	19	4	All users have been retrieved	2024-09-27 23:45:14.542+07
189	19	1	All users are being retrieved	2024-09-27 23:45:33.095+07
192	19	1	User is getting all roles	2024-09-27 23:45:33.101+07
190	19	4	All users have been retrieved	2024-09-27 23:45:33.175+07
191	19	1	User successfully get all roles	2024-09-27 23:45:33.179+07
193	19	1	All users are being retrieved	2024-09-27 23:46:09.096+07
194	19	1	User is getting all roles	2024-09-27 23:46:09.099+07
195	19	4	All users have been retrieved	2024-09-27 23:46:09.16+07
196	19	1	User successfully get all roles	2024-09-27 23:46:09.17+07
197	19	1	All users are being retrieved	2024-09-27 23:47:40.155+07
199	19	1	User is getting all roles	2024-09-27 23:47:40.16+07
198	19	4	All users have been retrieved	2024-09-27 23:47:40.243+07
200	19	1	User successfully get all roles	2024-09-27 23:47:40.256+07
201	19	1	All users are being retrieved	2024-09-27 23:48:33.086+07
203	19	1	User is getting all roles	2024-09-27 23:48:33.092+07
202	19	4	All users have been retrieved	2024-09-27 23:48:33.162+07
204	19	1	User successfully get all roles	2024-09-27 23:48:33.177+07
205	19	1	All users are being retrieved	2024-09-27 23:49:09.138+07
206	19	1	User is getting all roles	2024-09-27 23:49:09.142+07
207	19	4	All users have been retrieved	2024-09-27 23:49:09.227+07
208	19	1	User successfully get all roles	2024-09-27 23:49:09.238+07
209	19	1	All users are being retrieved	2024-09-27 23:49:46.085+07
211	19	1	User is getting all roles	2024-09-27 23:49:46.088+07
210	19	4	All users have been retrieved	2024-09-27 23:49:46.132+07
212	19	1	User successfully get all roles	2024-09-27 23:49:46.143+07
213	19	1	All users are being retrieved	2024-09-27 23:51:42.224+07
215	19	1	User is getting all roles	2024-09-27 23:51:42.23+07
645	4	4	User has created a ticket	\N
214	19	4	All users have been retrieved	2024-09-27 23:51:42.285+07
216	19	1	User successfully get all roles	2024-09-27 23:51:42.3+07
218	19	1	User is getting all roles	2024-09-27 23:51:50.111+07
217	19	1	All users are being retrieved	2024-09-27 23:51:50.113+07
219	19	1	User successfully get all roles	2024-09-27 23:51:50.116+07
220	19	4	All users have been retrieved	2024-09-27 23:51:50.119+07
221	19	1	All users are being retrieved	2024-09-27 23:51:51.093+07
222	19	1	User is getting all roles	2024-09-27 23:51:51.099+07
223	19	4	All users have been retrieved	2024-09-27 23:51:51.102+07
224	19	1	User successfully get all roles	2024-09-27 23:51:51.104+07
225	19	1	All users are being retrieved	2024-09-27 23:51:54.202+07
226	19	1	User is getting all roles	2024-09-27 23:51:54.212+07
227	19	4	All users have been retrieved	2024-09-27 23:51:54.214+07
228	19	1	User successfully get all roles	2024-09-27 23:51:54.219+07
229	19	1	All users are being retrieved	2024-09-27 23:53:04.963+07
230	19	1	User is getting all roles	2024-09-27 23:53:04.967+07
231	19	4	All users have been retrieved	2024-09-27 23:53:05.014+07
232	19	1	User successfully get all roles	2024-09-27 23:53:05.021+07
233	19	1	All users are being retrieved	2024-09-27 23:54:15.116+07
235	19	1	User is getting all roles	2024-09-27 23:54:15.12+07
234	19	4	All users have been retrieved	2024-09-27 23:54:15.191+07
236	19	1	User successfully get all roles	2024-09-27 23:54:15.197+07
237	19	1	All users are being retrieved	2024-09-27 23:54:19.714+07
238	19	1	User is getting all roles	2024-09-27 23:54:19.718+07
239	19	4	All users have been retrieved	2024-09-27 23:54:19.72+07
240	19	1	User successfully get all roles	2024-09-27 23:54:19.721+07
241	19	1	All users are being retrieved	2024-09-27 23:54:41.057+07
243	19	1	User is getting all roles	2024-09-27 23:54:41.06+07
242	19	4	All users have been retrieved	2024-09-27 23:54:41.146+07
244	19	1	User successfully get all roles	2024-09-27 23:54:41.159+07
245	19	1	All users are being retrieved	2024-09-28 00:07:53.093+07
246	19	1	User is getting all roles	2024-09-28 00:07:53.101+07
247	19	1	User successfully get all roles	2024-09-28 00:07:53.159+07
248	19	4	All users have been retrieved	2024-09-28 00:07:53.237+07
249	19	1	All users are being retrieved	2024-09-28 00:09:22.759+07
250	19	1	User is getting all roles	2024-09-28 00:09:22.762+07
251	19	4	All users have been retrieved	2024-09-28 00:09:22.814+07
252	19	1	User successfully get all roles	2024-09-28 00:09:22.817+07
253	19	5	Username 10003 logged in successfully	2024-09-28 00:09:31.657+07
254	19	1	Username 10003 is being retrieved	2024-09-28 00:09:32.366+07
255	19	1	Username 10003 has been retrieved	2024-09-28 00:09:32.368+07
256	19	1	Username 10003 is being retrieved	2024-09-28 00:19:14.588+07
257	19	1	Username 10003 has been retrieved	2024-09-28 00:19:14.639+07
258	19	1	All users are being retrieved	2024-09-28 00:36:40.454+07
260	19	1	User is getting all roles	2024-09-28 00:36:40.46+07
259	19	4	All users have been retrieved	2024-09-28 00:36:40.537+07
261	19	1	User successfully get all roles	2024-09-28 00:36:40.547+07
262	19	1	User is getting all roles	2024-09-28 00:44:34.171+07
263	19	1	User successfully get all roles	2024-09-28 00:44:34.221+07
264	19	1	All users are being retrieved	2024-09-28 00:44:54.912+07
265	19	1	User is getting all roles	2024-09-28 00:44:54.92+07
266	19	1	User successfully get all roles	2024-09-28 00:44:54.974+07
267	19	4	All users have been retrieved	2024-09-28 00:44:55.056+07
268	19	5	Username 10003 logged in successfully	2024-09-28 01:01:43.436+07
269	19	1	Username 10003 is being retrieved	2024-09-28 01:01:44.048+07
270	19	1	Username 10003 has been retrieved	2024-09-28 01:01:44.094+07
271	19	1	All users are being retrieved	2024-09-28 01:01:45.995+07
273	19	1	User is getting all roles	2024-09-28 01:01:46+07
272	19	4	All users have been retrieved	2024-09-28 01:01:46.003+07
274	19	1	User successfully get all roles	2024-09-28 01:01:46.061+07
275	19	4	User is creating an announcement	2024-09-28 01:02:58.276+07
276	19	4	User has created an announcement	2024-09-28 01:02:58.319+07
277	19	1	User is getting all roles	2024-09-28 01:03:03.099+07
278	19	1	User successfully get all roles	2024-09-28 01:03:03.104+07
279	19	4	User is creating a notification	2024-09-28 01:03:16.358+07
280	19	4	User has created a notification	2024-09-28 01:03:16.407+07
281	19	1	User successfully get all roles	2024-09-28 01:15:22.822+07
282	19	1	User is getting all roles	2024-09-28 01:15:22.754+07
286	19	1	User successfully get all roles	2024-09-28 01:18:43.233+07
298	19	4	All users have been retrieved	2024-09-28 02:27:23.85+07
302	19	1	User is getting all roles	2024-09-28 02:27:35.869+07
306	19	1	User successfully get all roles	2024-09-28 02:28:36.909+07
311	19	4	All users have been retrieved	2024-09-28 02:30:22.939+07
321	19	1	User is getting all roles	2024-09-28 02:30:51.141+07
332	19	4	All users have been retrieved	2024-09-28 02:38:28.358+07
333	19	1	All users are being retrieved	2024-09-28 02:38:42.858+07
339	19	1	User is getting all roles	2024-09-28 02:38:50.753+07
340	19	1	User successfully get all roles	2024-09-28 02:38:50.755+07
350	19	4	All users have been retrieved	2024-09-28 02:46:16.994+07
354	19	4	All users have been retrieved	2024-09-28 02:47:17.41+07
362	19	1	User successfully get all roles	2024-09-28 02:47:34.802+07
368	19	1	User successfully get all roles	2024-09-28 02:47:41.129+07
373	19	1	User successfully get all roles	2024-09-28 02:47:49.259+07
379	19	1	User successfully get all roles	2024-09-28 02:48:06.224+07
387	19	1	User is getting all roles	2024-09-28 03:57:17.735+07
391	19	1	User is getting all roles	2024-09-28 03:58:44.941+07
401	19	1	Username 10003 is being retrieved	2024-09-28 04:14:54.274+07
405	19	4	All users have been retrieved	2024-09-28 04:15:00.285+07
408	19	1	User is getting all roles	2024-09-28 04:42:40.164+07
412	19	1	User successfully get all roles	2024-09-28 04:50:44.442+07
421	19	4	User is getting all feedbacks	2024-09-28 13:16:57.113+07
423	19	4	All users have been retrieved	2024-09-28 13:17:04.605+07
426	1	5	Username 17965 logged in successfully	2024-09-28 13:24:28.909+07
427	1	1	Username 17965 is being retrieved	2024-09-28 13:24:29.605+07
431	1	1	Username 17965 has been retrieved	2024-09-28 14:05:06.638+07
435	1	1	Username 17965 is being retrieved	2024-09-28 14:08:37.455+07
438	1	1	Username 17965 has been retrieved	2024-09-28 14:08:39.15+07
442	13	5	Username 10001 logged in successfully	2024-09-28 14:18:56.165+07
610	16	1	Username 10002 is being retrieved	2024-09-30 03:26:33.518+07
611	16	1	Username 10002 has been retrieved	2024-09-30 03:26:33.552+07
612	19	5	Username 10003 logged in successfully	2024-09-30 03:57:50.292+07
613	19	5	Username 10003 logged in successfully	2024-09-30 05:24:47.165+07
614	19	5	Username 10003 logged in successfully	2024-09-30 05:25:22.687+07
615	19	5	Username 10003 logged in successfully	2024-09-30 05:37:24.407+07
616	19	1	Username 10003 is being retrieved	2024-09-30 05:37:24.784+07
617	19	1	Username 10003 has been retrieved	2024-09-30 05:37:24.837+07
618	19	1	All users are being retrieved	2024-09-30 05:38:41.869+07
619	19	4	All users have been retrieved	2024-09-30 05:38:41.941+07
620	19	1	User is getting all roles	2024-09-30 05:38:41.874+07
621	19	1	User successfully get all roles	2024-09-30 05:38:41.951+07
622	19	4	User is getting all feedbacks	2024-09-30 05:38:46.522+07
623	19	4	User is getting all feedbacks	2024-09-30 05:38:47.792+07
624	19	5	Username 10003 logged in successfully	2024-09-30 05:41:17.282+07
625	19	5	Username 10003 logged in successfully	2024-09-30 05:48:56.363+07
626	19	1	Username 10003 is being retrieved	2024-09-30 05:49:04.831+07
627	19	1	Username 10003 has been retrieved	2024-09-30 05:49:04.865+07
628	19	1	Username 10003 is being retrieved	2024-09-30 06:39:39.322+07
629	19	1	Username 10003 has been retrieved	2024-09-30 06:39:39.375+07
630	4	5	Username 18812 logged in failed due to wrong credentials information	2024-09-30 06:40:03.57+07
631	19	1	Username 10003 is being retrieved	2024-09-30 06:55:08.721+07
632	19	1	Username 10003 has been retrieved	2024-09-30 06:55:08.861+07
633	4	5	Username 18812 logged in successfully	2024-09-30 11:09:19.008+07
634	4	1	Username 18812 is being retrieved	2024-09-30 11:09:19.472+07
635	4	1	Username 18812 has been retrieved	2024-09-30 11:09:19.523+07
636	4	1	Username 18812 is being retrieved	2024-09-30 11:30:10.168+07
637	4	1	Username 18812 has been retrieved	2024-09-30 11:30:10.207+07
638	4	1	Username 18812 is being retrieved	2024-09-30 11:30:10.209+07
639	4	1	Username 18812 has been retrieved	2024-09-30 11:30:10.256+07
640	4	1	Username 18812 is being retrieved	2024-09-30 11:30:22.218+07
641	4	1	Username 18812 has been retrieved	2024-09-30 11:30:22.275+07
642	4	1	Username 18812 is being retrieved	2024-09-30 11:30:22.28+07
643	4	1	Username 18812 has been retrieved	2024-09-30 11:30:22.332+07
644	4	4	User is creating a ticket	2024-09-30 11:35:50.676+07
646	4	1	Username 18812 is being retrieved	2024-09-30 11:49:17.266+07
647	4	1	Username 18812 has been retrieved	2024-09-30 11:49:17.273+07
648	4	1	Username 18812 is being retrieved	2024-09-30 12:00:59.398+07
649	4	1	Username 18812 has been retrieved	2024-09-30 12:00:59.544+07
650	13	5	Username 10001 logged in successfully	2024-09-30 12:10:19.448+07
651	13	1	Username 10001 is being retrieved	2024-09-30 12:10:19.807+07
652	13	1	Username 10001 has been retrieved	2024-09-30 12:10:19.859+07
653	13	4	User is assigning to the ticket	2024-09-30 12:15:58.776+07
654	13	4	User has been assigned to the ticket	2024-09-30 12:15:58.827+07
655	13	1	User is getting all roles	2024-09-30 13:31:32.491+07
656	13	1	User successfully get all roles	2024-09-30 13:31:32.537+07
657	13	1	User is getting all roles	2024-09-30 13:31:36.505+07
658	13	1	User successfully get all roles	2024-09-30 13:31:36.508+07
659	13	1	User is getting all roles	2024-09-30 13:31:38.828+07
660	13	1	User successfully get all roles	2024-09-30 13:31:38.831+07
661	19	5	Username 10003 logged in successfully	2024-09-30 13:39:32.189+07
662	19	1	Username 10003 is being retrieved	2024-09-30 13:39:32.579+07
663	19	1	Username 10003 has been retrieved	2024-09-30 13:39:32.624+07
664	19	1	All users are being retrieved	2024-09-30 13:42:48.752+07
665	19	4	All users have been retrieved	2024-09-30 13:42:48.828+07
666	19	1	User is getting all roles	2024-09-30 13:42:48.759+07
667	19	1	User successfully get all roles	2024-09-30 13:42:48.837+07
668	19	1	All users are being retrieved	2024-09-30 13:43:07.063+07
669	19	4	All users have been retrieved	2024-09-30 13:43:07.074+07
670	19	1	User is getting all roles	2024-09-30 13:43:07.069+07
671	19	1	User successfully get all roles	2024-09-30 13:43:07.147+07
672	19	4	User is getting all feedbacks	2024-09-30 13:47:15.788+07
673	19	1	User is getting all roles	2024-09-30 13:48:31.57+07
674	19	1	User successfully get all roles	2024-09-30 13:48:31.626+07
675	19	1	Username 10003 is being retrieved	2024-09-30 14:55:51.656+07
676	19	1	Username 10003 has been retrieved	2024-09-30 14:55:51.705+07
677	19	1	Username 10003 is being retrieved	2024-09-30 14:55:51.92+07
678	19	1	Username 10003 has been retrieved	2024-09-30 14:55:51.926+07
679	19	1	Username 10003 is being retrieved	2024-09-30 14:58:16.904+07
680	19	1	Username 10003 has been retrieved	2024-09-30 14:58:16.938+07
681	4	5	Username 18812 logged in successfully	2024-09-30 14:58:33.444+07
682	4	1	Username 18812 is being retrieved	2024-09-30 14:58:33.765+07
683	4	1	Username 18812 has been retrieved	2024-09-30 14:58:33.803+07
684	4	1	Username 18812 is being retrieved	2024-09-30 14:58:38.005+07
685	4	1	Username 18812 has been retrieved	2024-09-30 14:58:38.01+07
686	4	1	Username 18812 is being retrieved	2024-09-30 14:58:38.014+07
687	4	1	Username 18812 has been retrieved	2024-09-30 14:58:38.057+07
688	4	1	Username 18812 is being retrieved	2024-09-30 14:59:07.448+07
689	4	1	Username 18812 has been retrieved	2024-09-30 14:59:07.491+07
690	4	1	Username 18812 is being retrieved	2024-09-30 14:59:07.493+07
691	4	1	Username 18812 has been retrieved	2024-09-30 14:59:07.539+07
692	4	1	Username 18812 is being retrieved	2024-09-30 15:08:58.796+07
693	4	1	Username 18812 has been retrieved	2024-09-30 15:08:58.836+07
694	4	1	Username 18812 is being retrieved	2024-09-30 15:08:58.839+07
695	4	1	Username 18812 has been retrieved	2024-09-30 15:08:58.883+07
696	4	1	Username 18812 is being retrieved	2024-09-30 15:10:07.835+07
697	4	1	Username 18812 has been retrieved	2024-09-30 15:10:07.84+07
698	4	1	Username 18812 is being retrieved	2024-09-30 15:10:07.844+07
699	4	1	Username 18812 has been retrieved	2024-09-30 15:10:07.887+07
700	4	1	Username 18812 is being retrieved	2024-09-30 15:10:39.155+07
701	4	1	Username 18812 has been retrieved	2024-09-30 15:10:39.199+07
702	4	1	Username 18812 is being retrieved	2024-09-30 15:10:44.556+07
703	4	1	Username 18812 has been retrieved	2024-09-30 15:10:44.564+07
704	4	1	Username 18812 is being retrieved	2024-09-30 15:10:44.569+07
705	4	1	Username 18812 has been retrieved	2024-09-30 15:10:44.617+07
706	19	5	Username 10003 logged in successfully	2024-09-30 15:49:12.337+07
707	19	1	Username 10003 is being retrieved	2024-09-30 15:49:12.72+07
708	19	1	Username 10003 has been retrieved	2024-09-30 15:49:12.762+07
709	19	5	Username 10003 logged in successfully	2024-09-30 18:40:20.619+07
710	4	5	Username 18812 logged in successfully	2024-09-30 18:50:54.804+07
711	4	1	Username 18812 is being retrieved	2024-09-30 18:50:55.176+07
712	4	1	Username 18812 has been retrieved	2024-09-30 18:50:55.323+07
713	13	5	Username 10001 logged in successfully	2024-09-30 18:59:11.501+07
714	1	5	Username 17965 logged in successfully	2024-09-30 19:15:16.315+07
715	1	1	Username 17965 is being retrieved	2024-09-30 19:15:16.982+07
716	1	1	Username 17965 has been retrieved	2024-09-30 19:15:17.057+07
717	1	1	Username 17965 is being retrieved	2024-09-30 19:15:20.78+07
718	1	1	Username 17965 has been retrieved	2024-09-30 19:15:20.789+07
719	1	1	Username 17965 is being retrieved	2024-09-30 19:15:20.794+07
720	1	1	Username 17965 has been retrieved	2024-09-30 19:15:20.86+07
721	1	1	Username 17965 is being retrieved	2024-09-30 19:15:24.18+07
722	1	1	Username 17965 has been retrieved	2024-09-30 19:15:24.184+07
723	1	1	Username 17965 is being retrieved	2024-09-30 19:15:45.335+07
724	1	1	Username 17965 has been retrieved	2024-09-30 19:15:45.403+07
725	1	1	Username 17965 is being retrieved	2024-09-30 19:15:45.414+07
726	1	1	Username 17965 has been retrieved	2024-09-30 19:15:45.493+07
727	1	4	User is creating a ticket	2024-09-30 19:17:56.753+07
728	1	4	User has created a ticket	\N
729	19	5	Username 10003 logged in successfully	2024-09-30 19:19:51.185+07
730	19	1	Username 10003 is being retrieved	2024-09-30 19:19:52.004+07
731	19	1	Username 10003 has been retrieved	2024-09-30 19:19:52.111+07
732	13	5	Username 10001 logged in successfully	2024-09-30 19:20:32.209+07
733	13	1	Username 10001 is being retrieved	2024-09-30 19:20:32.774+07
734	13	1	Username 10001 has been retrieved	2024-09-30 19:20:32.857+07
735	13	4	User is assigning to the ticket	2024-09-30 19:21:01.205+07
736	13	4	User has been assigned to the ticket	2024-09-30 19:21:01.301+07
737	1	5	Username 17965 logged in successfully	2024-09-30 19:25:44.101+07
738	1	1	Username 17965 is being retrieved	2024-09-30 19:25:45.438+07
739	1	1	Username 17965 has been retrieved	2024-09-30 19:25:45.534+07
740	13	4	User has done the ticket #72	2024-09-30 19:26:52.373+07
741	1	4	User is rating a ticket #72	2024-09-30 19:27:32.066+07
742	1	4	User has rated the ticket #72	2024-09-30 19:27:32.155+07
743	1	1	Username 17965 is being retrieved	2024-09-30 19:28:08.072+07
744	1	1	Username 17965 has been retrieved	2024-09-30 19:28:08.141+07
745	19	5	Username 10003 logged in successfully	2024-09-30 19:28:46.833+07
746	19	1	Username 10003 is being retrieved	2024-09-30 19:28:47.89+07
747	19	1	Username 10003 has been retrieved	2024-09-30 19:28:47.982+07
748	19	1	Username 10003 is being retrieved	2024-09-30 19:28:49.6+07
749	19	1	Username 10003 has been retrieved	2024-09-30 19:28:49.613+07
750	19	1	Username 10003 is being retrieved	2024-09-30 19:28:49.625+07
751	19	1	Username 10003 has been retrieved	2024-09-30 19:28:49.706+07
752	19	1	All users are being retrieved	2024-09-30 19:29:07.968+07
753	19	4	All users have been retrieved	2024-09-30 19:29:08.078+07
754	19	1	User successfully get all roles	2024-09-30 19:29:08.086+07
755	19	1	User is getting all roles	2024-09-30 19:29:07.978+07
756	19	1	User is editing user id #4 profile	2024-09-30 19:29:26.742+07
757	19	4	User has edited user id #4 profile	2024-09-30 19:29:26.869+07
758	19	1	All users are being retrieved	2024-09-30 19:29:27.141+07
759	19	4	All users have been retrieved	2024-09-30 19:29:27.15+07
760	19	4	Username Tuan Anh has been created	2024-09-30 19:30:43.113+07
761	19	4	An email has been sent to vhtuananh020402@gmail.com	2024-09-30 19:30:46.87+07
762	19	1	All users are being retrieved	2024-09-30 19:30:46.978+07
763	19	4	All users have been retrieved	2024-09-30 19:30:47.048+07
764	30	5	Username Tuan Anh logged in successfully	2024-09-30 19:31:32.56+07
765	30	1	Username Tuan Anh is being retrieved	2024-09-30 19:31:33.56+07
766	30	1	Username Tuan Anh has been retrieved	2024-09-30 19:31:33.635+07
767	19	5	Username 10003 logged in successfully	2024-09-30 19:32:40.6+07
768	19	1	Username 10003 is being retrieved	2024-09-30 19:32:41.482+07
769	19	1	Username 10003 has been retrieved	2024-09-30 19:32:41.552+07
770	19	1	All users are being retrieved	2024-09-30 19:32:43.063+07
771	19	4	All users have been retrieved	2024-09-30 19:32:43.077+07
772	19	1	User successfully get all roles	2024-09-30 19:32:43.164+07
773	19	1	User is getting all roles	2024-09-30 19:32:43.074+07
774	19	4	User is getting all feedbacks	2024-09-30 19:34:24.753+07
775	19	1	Username 10003 is being retrieved	2024-09-30 19:36:01.535+07
776	19	1	Username 10003 has been retrieved	2024-09-30 19:36:01.622+07
777	4	5	Username 18812 logged in successfully	2024-10-01 06:03:28.492+07
778	19	5	Username 10003 logged in successfully	2024-10-01 06:51:41.729+07
779	13	5	Username 10001 logged in successfully	2024-10-01 11:21:26.598+07
780	13	1	Username 10001 is being retrieved	2024-10-01 11:21:26.961+07
781	13	1	Username 10001 has been retrieved	2024-10-01 11:21:27.015+07
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, ticket_id, sender_id, message_details, created_date) FROM stdin;
1	3	1	Hi, I am waiting for you!	2024-09-23 03:27:05+07
5	34	1	I have just created this ticket	2024-09-23 22:46:57.466+07
6	35	1	I have just created this ticket	2024-09-24 02:54:40.96+07
76	61	16	Please come to the student affairs office to receive your ID Card, you forgot it at our place	2024-09-26 00:34:36.922+07
77	61	4	thank you so much	2024-09-26 00:34:55.662+07
378	62	4	I have just created this ticket	2024-09-26 17:08:42.687+07
379	62	13	I have just been assigned to this ticket	2024-09-26 17:09:33.794+07
380	62	13	How can I help you?	2024-09-26 17:10:21.345+07
381	62	4	I am too scared, but now everything is fine	2024-09-26 17:10:42.067+07
382	62	13	OK, if there exists some incidents like this in the future, please let me know	2024-09-26 17:11:05.709+07
383	62	4	Thank you very much	2024-09-26 17:11:11.694+07
384	62	13	You're welcome	2024-09-26 17:11:17.94+07
385	39	16	I have just been assigned to this ticket	2024-09-26 17:52:36.815+07
386	35	13	I have just been assigned to this ticket	2024-09-26 18:00:17.162+07
25	34	1	Can you help me find the key	2024-09-24 17:05:36.139+07
26	34	13	Do you remember the last time you keep it?	2024-09-24 17:08:41+07
27	37	1	I have just created this ticket	2024-09-24 21:23:07.067+07
28	34	1	Give me a second, I am trying to remember	2024-09-24 22:47:18.587+07
29	34	13	Okay, take your time, no need to worry	2024-09-24 22:50:49.355+07
30	34	13	Ah, if you still do not remember, you can come to the dorm office	2024-09-24 22:51:27.38+07
31	34	1	I got it, thank you very much	2024-09-24 22:53:11.552+07
32	34	13	You are welcome	2024-09-24 22:53:29.017+07
33	34	1	😂	2024-09-24 22:53:45.54+07
34	38	1	I have just created this ticket	2024-09-25 00:24:02.043+07
37	38	13	I have just been assigned to this ticket	2024-09-25 16:42:10.318+07
38	39	4	I have just created this ticket	2024-09-25 21:33:04.195+07
394	37	16	I have just been assigned to this ticket	2024-09-27 06:41:04.198+07
395	67	1	I have just created this ticket	2024-09-27 06:46:04.288+07
396	67	16	I have just been assigned to this ticket	2024-09-27 06:46:50.223+07
397	68	1	I have just created this ticket	2024-09-27 06:47:13.237+07
398	69	1	I have just created this ticket	2024-09-27 06:47:43.6+07
399	69	16	I have just been assigned to this ticket	2024-09-27 06:48:05.276+07
400	70	1	I have just created this ticket	2024-09-27 22:40:32.547+07
401	70	13	I have just been assigned to this ticket	2024-09-27 22:41:19.091+07
402	70	13	I saw your incident, don't worry, I am here to help	2024-09-27 22:47:48.512+07
403	70	1	Thnk you so much	2024-09-27 22:47:58.678+07
404	71	4	I have just created this ticket	2024-09-30 11:35:50.58+07
405	71	13	I have just been assigned to this ticket	2024-09-30 12:15:58.825+07
406	72	1	I have just created this ticket	2024-09-30 19:17:56.568+07
407	72	13	I have just been assigned to this ticket	2024-09-30 19:21:01.295+07
408	72	13	Ban co the mo ta ro hon ve van de nay duoc khong	2024-09-30 19:26:07.664+07
409	72	1	van de cua toi la	2024-09-30 19:26:17.025+07
60	61	4	I have just created this ticket	2024-09-25 23:17:37.501+07
66	61	16	I have just been assigned to this ticket	2024-09-26 00:14:18.179+07
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
62	5	2024-09-27 00:36:17.221+07	23
39	4	2024-09-27 00:36:23.754+07	24
70	4	2024-09-27 22:51:13.278+07	25
72	4	2024-09-30 19:27:32.018+07	26
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
34	4	I LOST MY ITEMS	2	3	2024-09-23 22:46:57.466+07	2024-09-26 17:58:44.429+07	I lost my room key
35	2	In the morning, while we are studying...\r\nA stranger person stepped into the class and suddenly ... :(	2	3	2024-09-24 02:54:40.96+07	2024-09-26 18:00:31.153+07	Some one has fought the lectuer
37	1	Last few days, the weather was so abnormal. At 10 AM this morning, when I tried studying ...	1	4	2024-09-24 21:23:07.067+07	2024-09-27 06:42:08.31+07	I have caught a cold
69	4	I lost my items	2	3	2024-09-27 06:47:43.6+07	2024-09-27 06:48:23.086+07	Lost again
61	4	Did any of you see my ID Card?	2	3	2024-09-25 23:17:37.501+07	2024-09-28 03:07:57+07	I just lost my identity card
67	1	Plesae come to my dorm room and fix the AC, it was so cold that make me cold :(	2	2	2024-09-27 06:46:04.288+07	\N	I just caught a cold
71	4	At 10 AM this morning, I lost my phone while studying at the library. The phone model is Samsung S24 Ultra Black Phantom. If anyone sees my phone, please contact me. Thank you very much	2	2	2024-09-30 11:35:50.58+07	\N	I lost my phone
39	6	As a student residing in the dormitory, I would like to report an issue with the door of my room. The door seems to be broken as it no longer closes properly, making it difficult to secure the room. The lock is jammed, and the hinges appear to be loose, causing the door to make a loud noise whenever it is moved. This has become a significant inconvenience, as it not only compromises privacy but also poses a security risk. I kindly request immediate maintenance assistance to resolve this problem.	1	3	2024-09-25 21:33:04.195+07	2024-09-26 18:02:53.87+07	Broken Door in Dormitory Room
62	2	I just saw 2 students fighting each other	2	3	2024-09-26 17:08:42.687+07	2024-09-26 17:14:54.584+07	Students fight at dorm
38	7	I was in my dorm one evening, working on an assignment when this guy knocked on my door. He looked like any other student—wearing a hoodie, carrying a backpack—so I didn’t think much of it. He introduced himself as someone who lived down the hall, said he had a class project coming up and was having trouble with his laptop. He asked if he could quickly use mine to check some notes from our school's online platform since his computer had apparently crashed. He seemed friendly, and in a dorm setting, you naturally want to trust the people around you.\r\n\r\nSo, I let him in. He sat at my desk, opened my laptop, and started typing. It seemed innocent enough at first, but he kept getting distracted, asking me questions like, 'Do you have Wi-Fi issues here too?' or 'Do you mind grabbing me a drink?' Trying to be helpful, I stepped out for a second to get some water. When I came back, he acted like everything was fine and quickly handed my laptop back, saying, 'Thanks, man! Really appreciate it!'\r\n\r\nA few days later, I noticed strange activity on my accounts. My emails were missing, social media had unauthorized logins, and even my bank account had transactions I didn’t make. That’s when I realized what had happened—he had used that brief moment with my laptop to install something or access my files. I felt sick to my stomach, angry that I’d trusted him and violated that sense of safety in my own dorm.	2	3	2024-09-25 00:24:02.043+07	2024-09-26 17:59:31.142+07	A guy scams my laptop
70	3	Some one do sth wrong to me	2	3	2024-09-27 22:40:32.547+07	2024-09-27 22:48:05.864+07	Please help me
68	1	Yesterday, 2 male students at Dorm D1 had a conflict. At first they blamed each other, but after a while, they started a fight.	2	1	2024-09-27 06:47:13.237+07	\N	2 students had a fight at dorm
72	4	details	2	3	2024-09-30 19:17:56.568+07	2024-09-30 19:26:52.362+07	I lost my phone
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
4	18812	Vũ Hoàng Tuấn Anh	18812@student.vgu.edu.vn	4	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 16:40:50+07	Computer Science and Engineering	606	0123456789	2020	Tỉnh Thái Bình	2002-04-01
30	Tuan Anh	Frankfurt University	vhtuananh020402@gmail.com	2	$2a$10$gEM6kM6dDvgU7WGMOtU.Luqh3rRJ5jtLtEkFk0pcNLCD1WQNdzTeC	Male	2024-09-30 19:30:43.08131+07	Computer Science	1	0848462556	2020	Tỉnh Thái Bình	2024-09-25
16	10002	Trần Văn Sinh	10002@staff.vgu.edu.vn	3	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 23:44:28+07	\N	1	0981782621	\N	Tỉnh Thái Bình	1980-06-22
8	10000	Trần Thị Hương	10000@student.vgu.edu.vn	4	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Female	2024-09-18 17:43:25+07	Business Administration	1355	0123912300	2022	TP Hồ Chí Minh	2004-09-18
1	17965	Bá Nguyễn Quốc Anh	17965@student.vgu.edu.vn	4	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 16:40:49+07	Computer Science	124	0987654123	2020	TP Hồ Chí Minh	2002-03-08
13	10001	Nguyễn Nguyên Vũ	10001@staff.vgu.edu.vn	2	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Male	2024-09-18 17:47:59+07		1	09912331441		TP Thủ Dầu Một	1992-10-20
19	10003	Phan Thị Hà	10003@admin.vgu.edu.vn	1	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy	Female	2024-09-18 23:46:31+07	\N	1	0933310103	\N	Tỉnh Thái Bình	1982-08-12
\.


--
-- Data for Name: User_Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User_Ticket" (user_id, ticket_id) FROM stdin;
1	3
13	3
16	61
4	62
13	62
16	39
13	35
16	37
1	34
1	35
1	67
1	37
13	34
16	67
1	38
1	68
1	69
16	69
1	70
13	70
4	71
13	71
1	72
13	72
13	38
4	39
4	61
\.


--
-- Name: Announcement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Announcement_id_seq"', 8, true);


--
-- Name: Attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Attachment_id_seq"', 67, true);


--
-- Name: Audience_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Audience_Type_id_seq"', 2, true);


--
-- Name: Dorm_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Dorm_id_seq"', 1603, true);


--
-- Name: Event_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_Type_id_seq"', 6, true);


--
-- Name: Feedback_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Feedback_id_seq"', 7, true);


--
-- Name: Log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Log_id_seq"', 781, true);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 22, true);


--
-- Name: Rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rating_id_seq"', 26, true);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 5, true);


--
-- Name: Ticket_Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Comment_id_seq"', 409, true);


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

SELECT pg_catalog.setval('public."Ticket_id_seq"', 72, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 30, true);


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
    ADD CONSTRAINT "User_dorm_id_fkey" FOREIGN KEY (dorm_id) REFERENCES public."Dorm"(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- Name: User User_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;


--
-- PostgreSQL database dump complete
--

