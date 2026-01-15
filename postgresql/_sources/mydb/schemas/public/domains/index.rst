|domains| Domains
====================

.. |domains| image:: /_static/images/sidebar_icons/domains.png

-----------------------------------
What is a Domain in PostgreSQL?
-----------------------------------

A **DOMAIN** is a **custom data type** built on top of an existing type, **with rules attached.**

Think of it as:
    “A reusable column rule”

Instead of repeating the same constraints in every table, you define them **once** as a domain.

==================================================================================================================

----------------------
Simple mental model
----------------------

.. list-table:: 
    :header-rows: 1

    * - Without Domain
      - With Domain
    * - Rules repeated in every column
      - Rules defined once
    * - Hard to maintain
      - Centralized
    * - Error-prone
      - Safe & consistent

**Basic syntax**

.. code-block:: postgres 

    CREATE DOMAIN domain_name AS base_type [CONSTRAINT ...];

**Very simple example**

❌ Without domain

.. code-block:: postgres 

    CREATE TABLE users (
        username TEXT NOT NULL CHECK (length(username) >= 3)
    );

You must repeat this everywhere.

✅ With domain

.. code-block:: postgres

    CREATE DOMAIN username_t AS TEXT
    CHECK (length(VALUE) >= 3);

    CREATE TABLE users (
    username username_t
    );

- ✔ Same rule
- ✔ Defined once
- ✔ Reusable

==================================================================================================================

-----------------
What is VALUE?
-----------------

Inside a domain:
	•	VALUE = the value being inserted
	•	Similar to NEW.column in triggers

**Domains in pgAdmin**

In pgAdmin:

.. code-block:: bash 

    Schemas
    └── public
        └── Domains

These are **schema-level reusable types.**

==================================================================================================================

--------------------------
Why Domains are powerful
--------------------------

Domains can enforce:
    - ✅ NOT NULL
    - ✅ CHECK constraints
    - ✅ DEFAULT values
    - ✅ Language rules
    - ✅ Formatting rules

==================================================================================================================

---------------------------
Pashto-specific examples
---------------------------

1️⃣ Pashto word domain (Unicode + not empty)

.. code-block:: postgres 

    CREATE DOMAIN pashto_word AS TEXT
        COLLATE "ps_af" NOT NULL
        CHECK (length(trim(VALUE)) > 0);

Use it: 

.. code-block:: postgres 

    CREATE TABLE pashto_words (
        word pashto_word
    );

==================================================================================================================

2️⃣ Pashto-only characters (advanced)

Example rule (Arabic script range):

.. code-block:: postgres 

    CREATE DOMAIN pashto_text AS TEXT
        CHECK (VALUE ~ '^[\u0600-\u06FF\s]+$');

This is a `regular expression <../../../../tutorial/.regex.html>`_ 
check used inside a **DOMAIN** or **CHECK constraint.**

- ✔ Rejects Latin text
- ✔ Accepts Arabic/Pashto script

==================================================================================================================

3️⃣ Language-safe text domain (multi-language)

.. code-block:: postgres 

    CREATE DOMAIN human_text AS TEXT
        COLLATE "und-x-icu"
        NOT NULL;

Use across all tables:

.. code-block:: postgres 

    CREATE TABLE articles (
        title human_text,
        content human_text
    );

------------------
Domain vs Type 
------------------

.. list-table:: 
    :header-rows: 1

    * - Feature
      - DOMAIN
      - TYPE
    * - Based on existing type
      - ✅
      - ❌
    * - Adds constraints
      - ✅
      - ❌
    * - Simple
      - ✅
      - ❌
    * - Best for validation
      - ✅
      - ❌
    * - Best for structure
      - ❌
      - ✅

**Use DOMAIN for rules, TYPE for structure**

==================================================================================================================

-----------------------------
Domain vs CHECK constraint
-----------------------------

.. list-table:: 
    :header-rows: 1

    * - Aspect
      - DOMAIN
      - CHECK
    * - Reusable
      - ✅
      - ❌
    * - Centralized
      - ✅
      - ❌
    * - Clean schema
      - ✅
      - ❌
    * - Column-specific
      - ❌
      - ✅

Important rules about Domains
	#.	Domains do not store data
	#.	They apply at insert/update
	#.	Changing a domain affects all tables using it
	#.	You cannot add indexes to domains
	#.	Domains respect collation

Real-world best practices

✅ Use domains for:
	- Usernames
	- Emails
	- Language text
	- Currency values
	- IDs
	- Phone numbers

❌ Don’t use domains for:
	- Complex logic
	- Relationships
	- Performance tricks

==================================================================================================================

Example error (what users see)

.. code-block:: postgres 

    INSERT INTO pashto_words VALUES ('');

❌ Error:

.. code-block:: postgres 

    value for domain pashto_word violates check constraint

That’s **good** — rules are enforced at DB level.

Summary
    A DOMAIN is a reusable, rule-enforced data type that keeps your database clean, consistent, and safe.




