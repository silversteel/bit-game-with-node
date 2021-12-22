CREATE SCHEMA gudang_ilmu_lib
    AUTHORIZATION postgres;

CREATE TABLE gudang_ilmu_lib.user (
	id_user character varying(200) NOT NULL PRIMARY KEY,
	username character varying(200) NOT NULL,
    password character varying(255) NOT NULL,
	last_login timestamp with time zone,
    is_activated boolean DEFAULT false,
    is_deleted boolean DEFAULT false,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(200) NOT NULL,
    changed_date timestamp with time zone,
    changed_by character varying(200),
    deleted_date timestamp with time zone,
    deleted_by character varying(200)
);

CREATE TABLE gudang_ilmu_lib.user.book_location (
	id_location serial NOT NULL,
	rack_code character varying(25) NOT NULL,
	rack_description text,
	is_deleted boolean DEFAULT false,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(200) NOT NULL,
    changed_date timestamp with time zone,
    changed_by character varying(200),
    deleted_date timestamp with time zone,
    deleted_by character varying(200)
);

CREATE TABLE gudang_ilmu_lib.user.book (
	id_book character varying(200) NOT NULL PRIMARY KEY,
	code character varying(25) NOT NULL,
	title text NOT NULL,
    author character varying(200) NOT NULL,
	publisher character varying(50),
	description text,
	id_location int REFERENCES gudang_ilmu_lib.user.book_location(id_location),
	is_deleted boolean DEFAULT false,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(200) NOT NULL,
    changed_date timestamp with time zone,
    changed_by character varying(200),
    deleted_date timestamp with time zone,
    deleted_by character varying(200)
);

CREATE TABLE gudang_ilmu_lib.user.membership (
	id_membership character varying(200) NOT NULL PRIMARY KEY,
	nik character varying(16) NOT NULL,
	name character varying(250) NOT NULL,
    birth_date date NOT NULL,
	birth_place character varying(150) NOT NULL,
	address text NOT NULL,
    last_rent timestamp with time zone,
    is_activated boolean DEFAULT false,
	is_deleted boolean DEFAULT false,
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(200) NOT NULL,
    changed_date timestamp with time zone,
    changed_by character varying(200),
    deleted_date timestamp with time zone,
    deleted_by character varying(200)
);

CREATE TABLE gudang_ilmu_lib.user.book_rent (
	id_rent character varying(200) NOT NULL PRIMARY KEY,
	rent_date timestamp with time zone NOT NULL,
    return_date timestamp with time zone,
    id_membership character varying(200) REFERENCES gudang_ilmu_lib.user.membership(id_membership),
    created_date timestamp with time zone DEFAULT now() NOT NULL,
    created_by character varying(200) NOT NULL,
    changed_date timestamp with time zone,
    changed_by character varying(200)
);

CREATE TABLE gudang_ilmu_lib.user.book_rent_detail (
	id_rent_detail bigserial NOT NULL,
	id_book character varying(200) REFERENCES gudang_ilmu_lib.user.book(id_book),
    id_rent character varying(200) REFERENCES gudang_ilmu_lib.user.book_rent(id_rent)
);

