Languages 
==========

-------------------------------------
What Are “Languages” in PostgreSQL?
-------------------------------------

In PostgreSQL, **Languages** means:

    Programming languages that PostgreSQL can use to write stored procedures, functions, triggers, and event triggers.

PostgreSQL is not just SQL — it can **execute code written in other languages inside the database.**

===========================================================================================================================================

---------------------------------------
1️ Why Does PostgreSQL Need Languages?
---------------------------------------

SQL alone is **not enough** for:
	- Loops
	- Conditions (if, else)
	- Error handling
	- Complex logic
	- Automation
	- Validation
	- System rules

So PostgreSQL embeds **procedural languages.**

===========================================================================================================================================

--------------------
2️ What Is plpgsql?
--------------------

plpgsql stands for:

    Procedural Language PostgreSQL

It is:
	- PostgreSQL’s native programming language
	- Installed by default
	- Tightly integrated with SQL

That’s why you see **Languages (1) → plpgsql**

===========================================================================================================================================

----------------------------------
3️ What Can You Do With plpgsql?
----------------------------------

With plpgsql, you can create:
    - Functions
    - Stored procedures
    - Triggers
    - Event triggers
    - Business rules
    - Auditing logic
    - Security checks

===========================================================================================================================================

--------------------------
4️ Simple plpgsql Example
--------------------------

.. code-block:: postgres 

    CREATE OR REPLACE FUNCTION add_numbers(a INT, b INT)
    RETURNS INT
    LANGUAGE plpgsql
    AS $$
    BEGIN
        RETURN a + b;
    END;
    $$;

Call it:

.. code-block:: postgres 

    SELECT add_numbers(5, 3);

===========================================================================================================================================

-------------------
5️ plpgsql vs SQL
-------------------

.. list-table::
    :header-rows: 1

    * - Feature
      - SQL
      - plpgsql
    * - Simple queries
      - ✅
      - ❌
    * - Loops
      - ❌
      - ✅
    * - IF / ELSE
      - ❌
      - ✅
    * - Variables
      - ❌
      - ✅
    * - Error handling
      - ❌
      - ✅
    * - Triggers
      - ❌
      - ✅

**plpgsql wraps SQL inside logic**

===========================================================================================================================================

--------------------------------------------------
6️ Why pgAdmin Shows “Languages” Under a Database
--------------------------------------------------

Languages are:
	- **Database-level objects**
	- Installed **per database**
	- Stored in system catalogs

So each database can have:
	- Different languages
	- Different permissions

===========================================================================================================================================

------------------------------------------
7️ Other PostgreSQL Languages (Optional)
------------------------------------------

PostgreSQL supports many languages **via extensions:**

.. list-table::
    :header-rows: 1

    * - Language
      - Name
    * - PL/pgSQL
      - plpgsql
    * - Python
      - plpython3u
    * - JavaScript
      - plv8
    * - Perl
      - plperl
    * - Tcl
      - pltcl
    * - R
      - plr

Example:

.. code-block:: postgres 

    CREATE EXTENSION plpython3u;

Then it appears under **Languages.**

===========================================================================================================================================

-----------------------------------
8️ Trusted vs Untrusted Languages
-----------------------------------

.. list-table::
    :header-rows: 1

    * - Type
      - Meaning
    * - Trusted
      - Safe, sandboxed
    * - Untrusted (u)
      - Can access OS

Examples:
	- plpgsql → trusted
	- plpython3u → untrusted

That’s why **superuser privileges** are required.

===========================================================================================================================================

---------------------------
9️ Languages vs Extensions
---------------------------

.. list-table:: 
    :header-rows: 1

    * - Languages
      - Extensions
    * - Execution engine
      - Feature bundle
    * - Used for logic
      - Used for capabilities
    * - Required for triggers
      - May add languages
    * - plpgsql is default
      - postgis, pgcrypto

Some extensions **add languages.**

.. note::

   PostgreSQL Languages are procedural programming languages that allow developers to write functions, stored procedures, and triggers inside the database. The default language, plpgsql, enables complex logic, loops, conditions, and error handling beyond standard SQL. 

