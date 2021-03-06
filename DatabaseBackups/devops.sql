PGDMP     .    $            	    x            devops     12.4 (Ubuntu 12.4-1.pgdg20.04+1)     13.0 (Ubuntu 13.0-1.pgdg16.04+1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    17666    devops    DATABASE     U   CREATE DATABASE devops WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_IN';
    DROP DATABASE devops;
                postgres    false                        3079    17667 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    17799    issues    TABLE     �  CREATE TABLE public.issues (
    issue_id integer NOT NULL,
    user_id uuid,
    title character varying(255) NOT NULL,
    services character varying(255) NOT NULL,
    assign_to character varying(255) NOT NULL,
    statusof character varying(255) NOT NULL,
    priorities character varying(255),
    created_at date DEFAULT CURRENT_DATE,
    breach character varying(255),
    actions character varying(255)
);
    DROP TABLE public.issues;
       public         heap    postgres    false            �            1259    17797    issues_issue_id_seq    SEQUENCE     �   CREATE SEQUENCE public.issues_issue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.issues_issue_id_seq;
       public          postgres    false    205            �           0    0    issues_issue_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.issues_issue_id_seq OWNED BY public.issues.issue_id;
          public          postgres    false    204            �            1259    17788    users    TABLE     H  CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_companyname character varying(255) NOT NULL,
    user_domainname character varying(255) NOT NULL,
    user_firstname character varying(255) NOT NULL,
    user_lastname character varying(255) NOT NULL,
    user_mobile character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL,
    user_password character varying(255) NOT NULL,
    user_verification character varying(255),
    user_role character varying(255),
    user_resetpasswordlink character varying(255)
);
    DROP TABLE public.users;
       public         heap    postgres    false    2                        2604    17802    issues issue_id    DEFAULT     r   ALTER TABLE ONLY public.issues ALTER COLUMN issue_id SET DEFAULT nextval('public.issues_issue_id_seq'::regclass);
 >   ALTER TABLE public.issues ALTER COLUMN issue_id DROP DEFAULT;
       public          postgres    false    205    204    205            �          0    17799    issues 
   TABLE DATA           �   COPY public.issues (issue_id, user_id, title, services, assign_to, statusof, priorities, created_at, breach, actions) FROM stdin;
    public          postgres    false    205   �       �          0    17788    users 
   TABLE DATA           �   COPY public.users (user_id, user_companyname, user_domainname, user_firstname, user_lastname, user_mobile, user_email, user_password, user_verification, user_role, user_resetpasswordlink) FROM stdin;
    public          postgres    false    203   �       �           0    0    issues_issue_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.issues_issue_id_seq', 22, true);
          public          postgres    false    204            %           2606    17808    issues issues_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_pkey PRIMARY KEY (issue_id);
 <   ALTER TABLE ONLY public.issues DROP CONSTRAINT issues_pkey;
       public            postgres    false    205            #           2606    17796    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            &           2606    17809    issues issues_user_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.issues
    ADD CONSTRAINT issues_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 D   ALTER TABLE ONLY public.issues DROP CONSTRAINT issues_user_id_fkey;
       public          postgres    false    2851    205    203            �     x���M��  ���\�	�������S�1����c�4c������C@*�[���ʰXf��<JY��LE�M,9�hh�F:;�u5\l�i���=h;�&��V7 ��Lp�s��rr'2,��~B������Ǯ|n�n�&y x\;!I��"%-�t.X��`�$��Tfeɣ���w�pwp�(�nI�0�������ֽI!���f�I_�5׭���+Q8�ϸ�?=��W�gm,���%��JN�ԉV`�Y�Ub��Y��:��U����p���@��"��q�B�      �   �  x�őKo�0���wt7r�Wlg׆��Puc;NiBʣ���'@5�h�َd]Y�G�����@��D$
P,p!�@0�9�PQ-�S3�7V]�v{����J�=�;e��[?\DJ\Ћ�!-d��*+�{Y"L���v:$�17*���U@(��B\AƱ���M�\������{}�'K#$p�n�RR��Pi7і����la�b+����fW�f�au��Z�t�G��E�~�'�"��~)�O��T����9��ht_7�����Z�N��@��l 4@���ǔ�-�°���&jSt4@�8nㅮ���Ǭd-����1�����}�{�ܗA����$ͦ�-#�5l�s?
�E�sh�_٢{4���/�6�p�:��??�(���_N����W˨;t�VT���,�����'�lE����/"z�g�z��Np�`	�P'�G�N�^�}s�O�r����������I���t:� �^U     