--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3 (Ubuntu 13.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 13.3 (Ubuntu 13.3-1.pgdg18.04+1)

-- Started on 2021-10-28 21:51:55 IST

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
-- TOC entry 211 (class 1259 OID 16603)
-- Name: bazaar_cart_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_cart_details (
    cd_id integer NOT NULL,
    cart_id integer,
    product_id integer,
    product_price numeric,
    quantity integer,
    delivery_price numeric
);


ALTER TABLE public.bazaar_cart_details OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16601)
-- Name: bazaar_cart_details_cd_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_cart_details_cd_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_cart_details_cd_id_seq OWNER TO postgres;

--
-- TOC entry 3151 (class 0 OID 0)
-- Dependencies: 210
-- Name: bazaar_cart_details_cd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_cart_details_cd_id_seq OWNED BY public.bazaar_cart_details.cd_id;


--
-- TOC entry 209 (class 1259 OID 16588)
-- Name: bazaar_carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_carts (
    cart_id integer NOT NULL,
    user_id integer,
    price numeric,
    delivery_price numeric,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    total numeric
);


ALTER TABLE public.bazaar_carts OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16586)
-- Name: bazaar_carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_carts_cart_id_seq OWNER TO postgres;

--
-- TOC entry 3152 (class 0 OID 0)
-- Dependencies: 208
-- Name: bazaar_carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_carts_cart_id_seq OWNED BY public.bazaar_carts.cart_id;


--
-- TOC entry 205 (class 1259 OID 16554)
-- Name: bazaar_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_categories (
    category_id integer NOT NULL,
    category_name text NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    status text
);


ALTER TABLE public.bazaar_categories OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16552)
-- Name: bazaar_categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_categories_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_categories_category_id_seq OWNER TO postgres;

--
-- TOC entry 3153 (class 0 OID 0)
-- Dependencies: 204
-- Name: bazaar_categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_categories_category_id_seq OWNED BY public.bazaar_categories.category_id;


--
-- TOC entry 216 (class 1259 OID 25514)
-- Name: bazaar_countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_countries (
    country_id integer NOT NULL,
    country_name character varying(20),
    currency character varying(10),
    currency_symbol character varying(5)
);


ALTER TABLE public.bazaar_countries OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 25512)
-- Name: bazaar_countries_country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_countries_country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_countries_country_id_seq OWNER TO postgres;

--
-- TOC entry 3154 (class 0 OID 0)
-- Dependencies: 215
-- Name: bazaar_countries_country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_countries_country_id_seq OWNED BY public.bazaar_countries.country_id;


--
-- TOC entry 212 (class 1259 OID 16746)
-- Name: bazaar_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_order (
    order_id character varying(20) NOT NULL,
    user_id integer NOT NULL,
    price numeric NOT NULL,
    delivery_price numeric NOT NULL,
    total numeric NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    email character varying(50) NOT NULL,
    address text NOT NULL
);


ALTER TABLE public.bazaar_order OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16759)
-- Name: bazaar_order_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_order_details (
    od_id integer NOT NULL,
    order_id character varying(20),
    product_id integer,
    product_price numeric,
    quantity integer,
    delivery_price numeric
);


ALTER TABLE public.bazaar_order_details OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16757)
-- Name: bazaar_order_details_od_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_order_details_od_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_order_details_od_id_seq OWNER TO postgres;

--
-- TOC entry 3155 (class 0 OID 0)
-- Dependencies: 213
-- Name: bazaar_order_details_od_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_order_details_od_id_seq OWNED BY public.bazaar_order_details.od_id;


--
-- TOC entry 207 (class 1259 OID 16566)
-- Name: bazaar_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_products (
    product_id integer NOT NULL,
    category_id integer,
    product_name character varying NOT NULL,
    product_image character varying,
    quantity integer,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    status text DEFAULT 'active'::text,
    price numeric NOT NULL,
    delivery_price numeric DEFAULT 0,
    product_desc character varying(500) DEFAULT 'No description'::character varying,
    gender character varying(10) DEFAULT 'Not specified'::character varying,
    country_id integer DEFAULT 1
);


ALTER TABLE public.bazaar_products OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16564)
-- Name: bazaar_products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_products_product_id_seq OWNER TO postgres;

--
-- TOC entry 3156 (class 0 OID 0)
-- Dependencies: 206
-- Name: bazaar_products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_products_product_id_seq OWNED BY public.bazaar_products.product_id;


--
-- TOC entry 203 (class 1259 OID 16536)
-- Name: bazaar_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_tokens (
    token_id integer NOT NULL,
    user_id integer,
    token character varying NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    last_access timestamp with time zone DEFAULT now()
);


ALTER TABLE public.bazaar_tokens OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16534)
-- Name: bazaar_tokens_token_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_tokens_token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_tokens_token_id_seq OWNER TO postgres;

--
-- TOC entry 3157 (class 0 OID 0)
-- Dependencies: 202
-- Name: bazaar_tokens_token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_tokens_token_id_seq OWNED BY public.bazaar_tokens.token_id;


--
-- TOC entry 201 (class 1259 OID 16520)
-- Name: bazaar_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bazaar_users (
    user_id integer NOT NULL,
    first_name text NOT NULL,
    last_name text,
    email character varying NOT NULL,
    phone bigint,
    password character varying NOT NULL,
    created_on timestamp with time zone DEFAULT now(),
    updated_on timestamp with time zone DEFAULT now(),
    status character varying(10) DEFAULT 'active'::character varying,
    access varchar(20) default 'user'
);


ALTER TABLE public.bazaar_users OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16518)
-- Name: bazaar_users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bazaar_users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bazaar_users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3158 (class 0 OID 0)
-- Dependencies: 200
-- Name: bazaar_users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bazaar_users_user_id_seq OWNED BY public.bazaar_users.user_id;


--
-- TOC entry 2983 (class 2604 OID 16606)
-- Name: bazaar_cart_details cd_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_cart_details ALTER COLUMN cd_id SET DEFAULT nextval('public.bazaar_cart_details_cd_id_seq'::regclass);


--
-- TOC entry 2980 (class 2604 OID 16591)
-- Name: bazaar_carts cart_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_carts ALTER COLUMN cart_id SET DEFAULT nextval('public.bazaar_carts_cart_id_seq'::regclass);


--
-- TOC entry 2970 (class 2604 OID 16557)
-- Name: bazaar_categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_categories ALTER COLUMN category_id SET DEFAULT nextval('public.bazaar_categories_category_id_seq'::regclass);


--
-- TOC entry 2986 (class 2604 OID 25517)
-- Name: bazaar_countries country_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_countries ALTER COLUMN country_id SET DEFAULT nextval('public.bazaar_countries_country_id_seq'::regclass);


--
-- TOC entry 2985 (class 2604 OID 16762)
-- Name: bazaar_order_details od_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order_details ALTER COLUMN od_id SET DEFAULT nextval('public.bazaar_order_details_od_id_seq'::regclass);


--
-- TOC entry 2972 (class 2604 OID 16569)
-- Name: bazaar_products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_products ALTER COLUMN product_id SET DEFAULT nextval('public.bazaar_products_product_id_seq'::regclass);


--
-- TOC entry 2967 (class 2604 OID 16539)
-- Name: bazaar_tokens token_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_tokens ALTER COLUMN token_id SET DEFAULT nextval('public.bazaar_tokens_token_id_seq'::regclass);


--
-- TOC entry 2963 (class 2604 OID 16523)
-- Name: bazaar_users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_users ALTER COLUMN user_id SET DEFAULT nextval('public.bazaar_users_user_id_seq'::regclass);


--
-- TOC entry 3000 (class 2606 OID 16608)
-- Name: bazaar_cart_details bazaar_cart_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_cart_details
    ADD CONSTRAINT bazaar_cart_details_pkey PRIMARY KEY (cd_id);


--
-- TOC entry 2998 (class 2606 OID 16595)
-- Name: bazaar_carts bazaar_carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_carts
    ADD CONSTRAINT bazaar_carts_pkey PRIMARY KEY (cart_id);


--
-- TOC entry 2994 (class 2606 OID 16563)
-- Name: bazaar_categories bazaar_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_categories
    ADD CONSTRAINT bazaar_categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3006 (class 2606 OID 25521)
-- Name: bazaar_countries bazaar_countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_countries
    ADD CONSTRAINT bazaar_countries_pkey PRIMARY KEY (country_id);


--
-- TOC entry 3004 (class 2606 OID 16764)
-- Name: bazaar_order_details bazaar_order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order_details
    ADD CONSTRAINT bazaar_order_details_pkey PRIMARY KEY (od_id);


--
-- TOC entry 3002 (class 2606 OID 16751)
-- Name: bazaar_order bazaar_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order
    ADD CONSTRAINT bazaar_order_pkey PRIMARY KEY (order_id);


--
-- TOC entry 2996 (class 2606 OID 16580)
-- Name: bazaar_products bazaar_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_products
    ADD CONSTRAINT bazaar_products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 2992 (class 2606 OID 16546)
-- Name: bazaar_tokens bazaar_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_tokens
    ADD CONSTRAINT bazaar_tokens_pkey PRIMARY KEY (token_id);


--
-- TOC entry 2988 (class 2606 OID 16533)
-- Name: bazaar_users bazaar_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_users
    ADD CONSTRAINT bazaar_users_email_key UNIQUE (email);


--
-- TOC entry 2990 (class 2606 OID 16531)
-- Name: bazaar_users bazaar_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_users
    ADD CONSTRAINT bazaar_users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3011 (class 2606 OID 16609)
-- Name: bazaar_cart_details fk_cart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_cart_details
    ADD CONSTRAINT fk_cart FOREIGN KEY (cart_id) REFERENCES public.bazaar_carts(cart_id) ON DELETE CASCADE;


--
-- TOC entry 3008 (class 2606 OID 16581)
-- Name: bazaar_products fk_category; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_products
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.bazaar_categories(category_id) ON DELETE CASCADE;


--
-- TOC entry 3009 (class 2606 OID 25522)
-- Name: bazaar_products fk_country; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_products
    ADD CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES public.bazaar_countries(country_id);


--
-- TOC entry 3014 (class 2606 OID 16765)
-- Name: bazaar_order_details fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order_details
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.bazaar_order(order_id) ON DELETE CASCADE;


--
-- TOC entry 3012 (class 2606 OID 16614)
-- Name: bazaar_cart_details fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_cart_details
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.bazaar_products(product_id) ON DELETE CASCADE;


--
-- TOC entry 3015 (class 2606 OID 16770)
-- Name: bazaar_order_details fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order_details
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.bazaar_products(product_id) ON DELETE CASCADE;


--
-- TOC entry 3013 (class 2606 OID 16752)
-- Name: bazaar_order fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_order
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.bazaar_users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3010 (class 2606 OID 16596)
-- Name: bazaar_carts fk_users; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_carts
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.bazaar_users(user_id) ON DELETE CASCADE;


--
-- TOC entry 3007 (class 2606 OID 16547)
-- Name: bazaar_tokens fk_usertoken; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bazaar_tokens
    ADD CONSTRAINT fk_usertoken FOREIGN KEY (user_id) REFERENCES public.bazaar_users(user_id) ON DELETE CASCADE;


-- Completed on 2021-10-28 21:51:55 IST

--
-- PostgreSQL database dump complete
--

