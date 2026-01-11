|publications| Publications 
==============================

.. |publications| image:: /_static/images/sidebar_icons/publications.png

--------------------------------------
What Are Publications in PostgreSQL?
--------------------------------------

PostgreSQL Publications define which tables and data changes (INSERT, UPDATE, DELETE) are exposed for logical replication. They act as the publishing side of PostgreSQL’s logical replication system, enabling selective, table-level data sharing across databases.


**Publication** is a **logical replication object.**

    A publication defines what data is allowed to be replicated (published) from a database to other databases.

Think of it as:

    **“I choose which tables and which changes I want to broadcast.”**

============================================================================================================================

PostgreSQL replication has **two main types:**

.. list-table:: 
    :header-rows: 1

    * - Type
      - Name
    * - Physical replication
      - Binary / streaming
    * - Logical replication
      - Publications & Subscriptions

============================================================================================================================

---------------------------
1️ Why Publications Exist
---------------------------

Publications allow you to:
	- Replicate **specific tables**, not whole DB
	- Replicate **INSERT / UPDATE / DELETE**
	- Share data **between different PostgreSQL versions**
	- Do **microservice-style data sharing**
	- Build **read replicas, analytics replicas, sync services**

============================================================================================================================

-------------------------------------------
2️ What pgAdmin Shows Under “Publications”
-------------------------------------------

In pgAdmin:

.. code-block:: bash

    Database
    └── Publications

If empty → no logical replication is configured yet.

Publications live **inside a database**, not at server level.

============================================================================================================================

-------------------------------------
3️ What Does a Publication Contain?
-------------------------------------

A publication defines:

.. list-table::
    :header-rows: 1

    * - Item
      - Description
    * - Tables
      - Which tables are published
    * - Actions
      - INSERT / UPDATE / DELETE
    * - Schema
      - Optional
    * - Ownership
      - Database role

============================================================================================================================

-------------------------------
4️ Simple Publication Example
-------------------------------

**Step 1:** Create a publication

.. code-block:: postgres 

    CREATE PUBLICATION my_pub
    FOR TABLE users, orders;

Now PostgreSQL will publish changes from:
	- users
	- orders


**Step 2:** Publish all tables (common)

.. code-block:: postgres 

    CREATE PUBLICATION all_tables_pub
    FOR ALL TABLES;

⚠ Use carefully — this publishes everything.

============================================================================================================================

----------------------------------
5️ What Exactly Gets Replicated?
----------------------------------

By default:
	- INSERT
	- UPDATE
	- DELETE
	- TRUNCATE (optional)

You can control this:

.. code-block:: postgres 

    CREATE PUBLICATION pub_changes
    FOR TABLE users
    WITH (publish = 'insert, update');

============================================================================================================================

------------------------------------
6️ Publications Do NOTHING Alone ⚠️
------------------------------------

Very important concept:

    A publication by itself does not replicate anything.

It needs:
➡ **Subscription** (on another database)

============================================================================================================================

**7️ Publications + Subscriptions (Publisher vs Subscriber)**

.. list-table::
    :header-rows: 1

    * - Role
      - Object
    * - Source DB
      - Publication
    * - Target DB
      - Subscription

Flow:

.. code-block:: bash 

    Publisher DB ──(Publication)──▶ Subscriber DB

============================================================================================================================

8️ **Real-World Analogy** 🌍

Imagine a news agency:
	•	Publication = What news is published
	•	Subscription = Who receives the news

You cannot receive news without:
	•	A publisher
	•	A subscriber

============================================================================================================================

9️ **Real-World Use Cases**

Microservices
	- User service publishes users
	- Order service subscribes to users

Analytics DB
	- Production DB publishes tables
	- Analytics DB subscribes (read-only)

Multi-region sync
	- One region publishes
	- Others subscribe

SaaS multi-tenant
	- Central DB publishes
	- Client DBs subscribe

============================================================================================================================


🔐 Security & Permissions
	- Only table owners can publish tables
	- Superuser or replication role required
	- Uses replication slots

============================================================================================================================

1️0️ What Publications Are NOT

    ❌ Not backups

    ❌ Not full DB clone

    ❌ Not physical replication

    ❌ Not high-availability by itself

They are data-sharing rules.
