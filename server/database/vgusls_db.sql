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
-- Name: Attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attachment" (
    id integer NOT NULL,
    attachment_name character varying NOT NULL,
    url character varying NOT NULL,
    create_date time with time zone NOT NULL
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
-- Name: Conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Conversation" (
    id integer NOT NULL,
    ticket_id integer NOT NULL,
    subject character varying NOT NULL
);


ALTER TABLE public."Conversation" OWNER TO postgres;

--
-- Name: Conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Conversation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Conversation_id_seq" OWNER TO postgres;

--
-- Name: Conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Conversation_id_seq" OWNED BY public."Conversation".id;


--
-- Name: Event_Type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Event_Type" (
    id integer NOT NULL,
    event_type_name character varying NOT NULL
);


ALTER TABLE public."Event_Type" OWNER TO postgres;

--
-- Name: Log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Log" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    "timestamp" time with time zone NOT NULL,
    event_id integer NOT NULL,
    description text NOT NULL
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
    conversation_id integer NOT NULL,
    sender_id integer NOT NULL,
    recipient_id integer NOT NULL,
    content text NOT NULL,
    "timestamp" time with time zone NOT NULL
);


ALTER TABLE public."Message" OWNER TO postgres;

--
-- Name: Message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Message_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Message_id_seq" OWNER TO postgres;

--
-- Name: Message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Message_id_seq" OWNED BY public."Message".id;


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification" (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    content text NOT NULL,
    create_date timestamp with time zone
);


ALTER TABLE public."Notification" OWNER TO postgres;

--
-- Name: Notification_Attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notification_Attachment" (
    notification_id integer NOT NULL,
    attachment_id integer NOT NULL
);


ALTER TABLE public."Notification_Attachment" OWNER TO postgres;

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
    id integer NOT NULL,
    ticket_id integer NOT NULL,
    rating_score integer NOT NULL,
    create_date time with time zone NOT NULL
);


ALTER TABLE public."Rating" OWNER TO postgres;

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
    create_date time with time zone NOT NULL,
    end_date time with time zone NOT NULL,
    content text NOT NULL,
    audience_type_id integer NOT NULL,
    ticket_status_id integer NOT NULL
);


ALTER TABLE public."Ticket" OWNER TO postgres;

--
-- Name: Ticket_Attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ticket_Attachment" (
    ticket_id integer NOT NULL,
    attachment_id integer NOT NULL
);


ALTER TABLE public."Ticket_Attachment" OWNER TO postgres;

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
    create_date time with time zone NOT NULL,
    password character varying NOT NULL
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
-- Name: Attachment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attachment" ALTER COLUMN id SET DEFAULT nextval('public."Attachment_id_seq"'::regclass);


--
-- Name: Audience_Type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Audience_Type" ALTER COLUMN id SET DEFAULT nextval('public."Audience_Type_id_seq"'::regclass);


--
-- Name: Conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversation" ALTER COLUMN id SET DEFAULT nextval('public."Conversation_id_seq"'::regclass);


--
-- Name: Log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log" ALTER COLUMN id SET DEFAULT nextval('public."Log_id_seq"'::regclass);


--
-- Name: Message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message" ALTER COLUMN id SET DEFAULT nextval('public."Message_id_seq"'::regclass);


--
-- Name: Notification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification" ALTER COLUMN id SET DEFAULT nextval('public."Notification_id_seq"'::regclass);


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
-- Data for Name: Attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attachment" (id, attachment_name, url, create_date) FROM stdin;
\.


--
-- Data for Name: Audience_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Audience_Type" (id, audience_type_name) FROM stdin;
\.


--
-- Data for Name: Conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Conversation" (id, ticket_id, subject) FROM stdin;
\.


--
-- Data for Name: Event_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event_Type" (id, event_type_name) FROM stdin;
\.


--
-- Data for Name: Log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Log" (id, user_id, "timestamp", event_id, description) FROM stdin;
\.


--
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Message" (id, conversation_id, sender_id, recipient_id, content, "timestamp") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification" (id, sender_id, content, create_date) FROM stdin;
\.


--
-- Data for Name: Notification_Attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notification_Attachment" (notification_id, attachment_id) FROM stdin;
\.


--
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rating" (id, ticket_id, rating_score, create_date) FROM stdin;
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

COPY public."Ticket" (id, ticket_type_id, create_date, end_date, content, audience_type_id, ticket_status_id) FROM stdin;
\.


--
-- Data for Name: Ticket_Attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Attachment" (ticket_id, attachment_id) FROM stdin;
\.


--
-- Data for Name: Ticket_Role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Role" (role_id, ticket_type_id, can_create, can_read, can_update, can_delete) FROM stdin;
\.


--
-- Data for Name: Ticket_Status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Status" (id, status_name) FROM stdin;
\.


--
-- Data for Name: Ticket_Type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ticket_Type" (id, ticket_type_name, priority) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, username, fullname, email, role_id, create_date, password) FROM stdin;
1	17965	Bá Nguyễn Quốc Anh	17965@student.vgu.edu.vn	4	16:54:53+07	$2b$12$sSoc30jnIZ.KC.L2Jnq0X.ep9nhcFlPd10eByTcLPI.u/dLQFFZqy
\.


--
-- Data for Name: User_Ticket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User_Ticket" (user_id, ticket_id) FROM stdin;
\.


--
-- Name: Attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Attachment_id_seq"', 1, false);


--
-- Name: Audience_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Audience_Type_id_seq"', 1, false);


--
-- Name: Conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Conversation_id_seq"', 1, false);


--
-- Name: Log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Log_id_seq"', 1, false);


--
-- Name: Message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Message_id_seq"', 1, false);


--
-- Name: Notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Notification_id_seq"', 1, false);


--
-- Name: Role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Role_id_seq"', 5, true);


--
-- Name: Ticket_Status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Status_id_seq"', 1, false);


--
-- Name: Ticket_Type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_Type_id_seq"', 1, false);


--
-- Name: Ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Ticket_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


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
-- Name: Conversation Conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_pkey" PRIMARY KEY (id);


--
-- Name: Conversation Conversation_ticket_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_ticket_id_key" UNIQUE (ticket_id);


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
-- Name: Log Log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_pkey" PRIMARY KEY (id);


--
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- Name: Notification_Attachment Notification_Attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Attachment"
    ADD CONSTRAINT "Notification_Attachment_pkey" PRIMARY KEY (notification_id, attachment_id);


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
-- Name: Ticket_Attachment Ticket_Attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Attachment"
    ADD CONSTRAINT "Ticket_Attachment_pkey" PRIMARY KEY (ticket_id, attachment_id);


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
-- Name: Conversation Conversation_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Conversation"
    ADD CONSTRAINT "Conversation_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) NOT VALID;


--
-- Name: Log Log_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_event_id_fkey" FOREIGN KEY (event_id) REFERENCES public."Event_Type"(id) NOT VALID;


--
-- Name: Log Log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Log"
    ADD CONSTRAINT "Log_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."User"(id) NOT VALID;


--
-- Name: Message Message_conversation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_conversation_id_fkey" FOREIGN KEY (conversation_id) REFERENCES public."Conversation"(id) NOT VALID;


--
-- Name: Message Message_recipient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_recipient_id_fkey" FOREIGN KEY (recipient_id) REFERENCES public."User"(id) NOT VALID;


--
-- Name: Message Message_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id) NOT VALID;


--
-- Name: Notification_Attachment Notification_Attachment_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Attachment"
    ADD CONSTRAINT "Notification_Attachment_attachment_id_fkey" FOREIGN KEY (attachment_id) REFERENCES public."Attachment"(id) NOT VALID;


--
-- Name: Notification_Attachment Notification_Attachment_notification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification_Attachment"
    ADD CONSTRAINT "Notification_Attachment_notification_id_fkey" FOREIGN KEY (notification_id) REFERENCES public."Notification"(id);


--
-- Name: Notification Notification_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES public."User"(id);


--
-- Name: Rating Rating_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id) NOT VALID;


--
-- Name: Ticket_Attachment Ticket_Attachment_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Attachment"
    ADD CONSTRAINT "Ticket_Attachment_attachment_id_fkey" FOREIGN KEY (attachment_id) REFERENCES public."Attachment"(id) NOT VALID;


--
-- Name: Ticket_Attachment Ticket_Attachment_ticket_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Attachment"
    ADD CONSTRAINT "Ticket_Attachment_ticket_id_fkey" FOREIGN KEY (ticket_id) REFERENCES public."Ticket"(id);


--
-- Name: Ticket_Role Ticket_Role_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Role"
    ADD CONSTRAINT "Ticket_Role_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id);


--
-- Name: Ticket_Role Ticket_Role_ticket_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket_Role"
    ADD CONSTRAINT "Ticket_Role_ticket_type_id_fkey" FOREIGN KEY (ticket_type_id) REFERENCES public."Ticket_Type"(id) NOT VALID;


--
-- Name: Ticket Ticket_audience_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_audience_type_id_fkey" FOREIGN KEY (audience_type_id) REFERENCES public."Audience_Type"(id) NOT VALID;


--
-- Name: Ticket Ticket_ticket_status_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticket_status_id_fkey" FOREIGN KEY (ticket_status_id) REFERENCES public."Ticket_Status"(id) NOT VALID;


--
-- Name: Ticket Ticket_ticket_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticket_type_id_fkey" FOREIGN KEY (ticket_type_id) REFERENCES public."Ticket_Type"(id) NOT VALID;


--
-- Name: User User_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY (role_id) REFERENCES public."Role"(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

