👤 sherullahmohtat
====================

--------------------------
What is sherullahmohtat?
--------------------------

sherullahmohtat is a regular PostgreSQL login role created for YOU.

This role:
	- Represents a **human / application owner**
	- Is not built-in
	- Is **not automatically dangerous**
	- Gets power only from what you grant to it

--------------------------------
How it differs from pg_* roles
--------------------------------

.. list-table::
    :header-rows: 1

    * - Type
      - Example
      - Purpose
    * - System roles
      - pg_monitor, pg_read_all_data
      - PostgreSQL internals
    * - User role
      - sherullahmohtat
      - Human / app access
    * - Group role
      - app_readonly, app_writer
      - Permission bundles

sherullahmohtat is **where real access control starts**

--------------------------------
What permissions does it have?
--------------------------------

That depends on **what you granted.**

You can check exactly:

.. code-block:: postgres 

    SELECT rolname, rolsuper, rolcreatedb, rolcreaterole, rolcanlogin
    FROM pg_roles
    WHERE rolname = 'sherullahmohtat';

And memberships:

.. code-block:: postgres 

    SELECT r.rolname
    FROM pg_roles r
    JOIN pg_auth_members m ON r.oid = m.roleid
    JOIN pg_roles u ON u.oid = m.member
    WHERE u.rolname = 'sherullahmohtat';

----------------------------------------
Typical responsibilities of this role
----------------------------------------

sherullahmohtat may be:

👨‍💻 Developer role
	- Create schemas
	- Create tables
	- Run migrations
	- Debug queries

🧑‍💼 Owner role
	- Own databases
	- Own schemas
	- Grant/revoke permissions

🚫 What it should NOT be
	- ❌ Superuser (unless learning locally)
	- ❌ Holder of pg_write_server_files
	- ❌ Holder of pg_execute_server_program

**Best-practice role architecture (IMPORTANT)**

❌ Bad (common mistake)

.. code-block:: postgres 

    GRANT ALL PRIVILEGES TO sherullahmohtat;

✅ Good (enterprise style)

.. code-block:: postgres 

    -- owner role
    CREATE ROLE mydb_owner NOLOGIN;

    -- app roles
    CREATE ROLE mydb_app_read;
    CREATE ROLE mydb_app_write;

    -- grant ownership
    ALTER DATABASE mydb OWNER TO mydb_owner;

    -- grant to user
    GRANT mydb_owner TO sherullahmohtat;

Your user **inherits power**, not raw power.

**Ownership vs permissions (critical concept)**

.. list-table:: 
    :header-rows: 1

    * - Concept
      - Meaning
    * - Owner
      - Full control over object
    * - Privilege
      - Allowed actions
    * - Membership
      - Permission inheritance

Owners bypass privileges

**Recommended permissions for YOU (dev machine)**

Since this is **local learning + dev**, it’s OK to have:

.. list-table:: 
    :header-rows: 1

    * - Capability
      - OK locally
    * - Create DB
      - ✅
    * - Create schema
      - ✅
    * - Create tables
      - ✅
    * - Role creation
      - ⚠️ (careful)
    * - Superuser
      - ⚠️ ONLY local

**For production (very important)**

In prod, **sherullahmohtat should NOT exist.**

Instead:
	- CI/CD role
	- Migration role
	- App runtime role

Example:

.. code-block:: bash 

    mydb_migration
    mydb_app_runtime
    mydb_readonly

**Mental model**

System roles = PostgreSQL’s brain

User roles = Your access policy

sherullahmohtat is the **controller**, not the engine.

Quick checklist for this role
	- Not superuser (prod)
	- No pg_* dangerous roles
	- Owns only what it must
	- Uses group roles
	- Separate app roles

**Summary**

.. list-table::
    :header-rows: 1

    * - Attribute
      - Value
    * - Role type
      - User / Login
    * - System role
      - ❌
    * - Dangerous by default
      - ❌
    * - Power depends on grants
      - ✅
    * - Should exist in prod
      - ❌

=========================================================================================================

---------------------------------
What is a PostgreSQL Superuser?
---------------------------------

A **superuser** in PostgreSQL is a role that **bypasses ALL permission checks.**

It is the **database equivalent of root on Linux.**

--------------------------
What a superuser can do
--------------------------

Everything. Absolutely everything.

.. list-table::
  :header-rows: 1

  * - Capability
    - Superuser
  * - Read any table
    - ✅
  * - Write any table
    - ✅
  * - Drop any database
    - ✅
  * - Bypass row-level security (RLS)
    - ✅
  * - Read/write server files
    - ✅
  * - Execute OS commands (indirectly)
    - ✅
  * - Access all schemas
    - ✅
  * - Become any role
    - ✅
  * - Disable security
    - ✅

Privileges do not apply to superusers

------------------------------
How PostgreSQL enforces this
------------------------------

PostgreSQL internally checks:

.. code-block:: bash 

  IF role.is_superuser:
      ALLOW
  ELSE:
      CHECK PERMISSIONS

So:
	- GRANT / REVOKE = ignored
	- Ownership = irrelevant
	- RLS = ignored

-------------------------------------
How to check if a role is superuser
-------------------------------------

.. code-block:: postgres 

  SELECT rolname, rolsuper
  FROM pg_roles;

Or for a specific role:

.. code-block:: postgres 

  SELECT rolname, rolsuper
  FROM pg_roles
  WHERE rolname = 'sherullahmohtat';

------------------------------
How a role becomes superuser
------------------------------

Only an **existing superuser** can create another one:

.. code-block:: postgres 

  CREATE ROLE admin_user WITH SUPERUSER LOGIN;

Or:

.. code-block:: postgres 

  ALTER ROLE sherullahmohtat WITH SUPERUSER;

⚠️ This is **dangerous in production.**

----------------------------
Why superuser is dangerous
----------------------------

❌ Security bypass
	- Ignores permissions
	- Ignores row-level security
	- Ignores schema isolation

❌ Data loss
	- Can drop databases accidentally
	- Can truncate system catalogs

❌ OS-level access

Using:
	- COPY TO/FROM PROGRAM
	- pg_read_file()
	- pg_write_file()

A superuser can **read or write files on the database server.**

-------------------------
Superuser vs pg_* roles
-------------------------

.. list-table::
  :header-rows: 1

  * - Role
    - Power
  * - Superuser
    - Unlimited
  * - pg_read_all_data
    - Read tables only
  * - pg_monitor
    - View stats
  * - pg_execute_server_program
    - Run OS programs
  * - Superuser
    - All of the above + more

Superuser **implicitly has all pg_* roles**

==============================================================================================================================

**Why you often see superuser in local dev**

Because it’s convenient:
	- Install extensions
	- Debug
	- Learn
	- No permission headaches

On your local Mac:
  ✅ **Superuser is OK**

**🚫 Why superuser should NOT exist in production apps**

Production rule:
  Applications must NEVER connect as superuser

Why?
	- One SQL injection = total database compromise
	- One bug = data destruction
	- One leaked password = server takeover

==============================================================================================================================

**How real companies handle this**

**Netflix / Uber / Meta style:**

.. list-table::
  :header-rows: 1

  * - Role
    - Superuser?
  * - DBA root
    - ✅ (rarely used)
  * - Migration role
    - ❌
  * - App runtime
    - ❌
  * - Read replicas
    - ❌
  * - Analysts
    - ❌

Superuser:
	- Exists
	- Locked down
	- Used only for emergencies

**Best-practice alternative**

Instead of superuser, combine **specific roles:**

.. code-block:: postgres 

  GRANT pg_monitor TO app_monitor;
  GRANT pg_read_all_data TO app_read;
  GRANT pg_write_all_data TO app_write;

This gives **controlled power** without total risk.

**Mental model**

.. list-table::
  :header-rows: 1

  * - Concept
    - Analogy
  * - Superuser
    - Root user (Linux)
  * - Database owner
    - Folder owner
  * - Schema owner
    - Subfolder owner
  * - GRANT
    - File permissions
  * - pg_* roles
    - Capabilities

======================================================================================================================

**Production-grade role architecture (RECOMMENDED)**

🔐 1. Base group roles (NO LOGIN)

.. code-block:: postgres 

  CREATE ROLE app_read NOLOGIN;
  CREATE ROLE app_write NOLOGIN;

🔐 2. Schema ownership role (NO LOGIN)

.. code-block:: postgres 

  CREATE ROLE app_owner NOLOGIN;

This role:
	- Owns tables
	- Owns schemas
	- Used for migrations only

🔑 3. Application login role (LOGIN)

.. code-block:: postgres 

  CREATE ROLE app_user
  LOGIN
  PASSWORD 'strong_password'
  NOSUPERUSER
  NOCREATEDB
  NOCREATEROLE
  NOINHERIT;

Attach permissions via groups:

.. code-block:: postgres 

  GRANT app_read, app_write TO app_user;

🔑 4. Grant permissions (example)

.. code-block:: postgres 

  GRANT CONNECT ON DATABASE mydb TO app_user;
  GRANT USAGE ON SCHEMA public TO app_read, app_write;

  GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_read;
  GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_write;

  ALTER DEFAULT PRIVILEGES
  GRANT SELECT ON TABLES TO app_read;

  ALTER DEFAULT PRIVILEGES
  GRANT INSERT, UPDATE, DELETE ON TABLES TO app_write;

======================================================================================================================

 Real-world mapping (very important)

.. list-table::
  :header-rows: 1

  * - Purpose
    - Role
  * - DBA
    - superuser
  * - Migrations
    - app_owner
  * - Backend API
    - app_user
  * - Read-only dashboards
    - app_read
  * - Workers / jobs
    - app_worker
  * - Monitoring
    - pg_monitor

Golden production rules (memorize these)
	1.	Apps never use superuser

	2.	Ownership ≠ usage

	3.	Group roles > direct grants

	4.	One purpose = one role
  
	5.	Credentials rotated, not shared

Final answer (simple)

In production, you use:
	- Non-superuser
	- Login role
	- Granted permissions via group roles
	- No pg_* dangerous roles
	- Ownership separated from runtime access

