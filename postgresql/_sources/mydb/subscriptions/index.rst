|subscriptions| Subscriptions 
================================

.. |subscriptions| image:: /_static/images/sidebar_icons/subscriptions.png

---------------------------------------
 What Are Subscriptions in PostgreSQL?
---------------------------------------

A PostgreSQL subscription connects to a publication and continuously replicates data changes (INSERT, UPDATE, DELETE) from a source database into a target database using logical replication.

A **subscription** is a logical replication object that **connects to a publication and pulls data from it.**

**If Publication says “what to share”, Subscription says “I want to receive it”.**

=======================================================================================================================================

----------------------------
Publication vs Subscription
----------------------------
.. list-table:: 
    :header-rows: 1

    * - Aspect
      - Publication
      - Subscription
    * - Lives in
      - Source database
      - Target database
    * - Role
      - Publisher
      - Subscriber
    * - Defines
      - What data is shared
      - Where data is copied
    * - Direction
      - Outgoing
      - Incoming
    * - pgAdmin section
      - Publications
      - Subscriptions

=======================================================================================================================================

------------------------
How Subscriptions Work
------------------------

1️ Publisher database
	- Has tables
	- Defines a **publication**

.. code-block:: postgres

    CREATE PUBLICATION my_pub FOR TABLE users;

=======================================================================================================================================

2️ Subscriber database
	- Creates **subscription**
	- Connects to publisher

.. code-block:: postgres 

    CREATE SUBSCRIPTION my_sub
    CONNECTION 'host=source_host dbname=source_db user=rep_user password=secret'
    PUBLICATION my_pub;

=======================================================================================================================================

3️ PostgreSQL does the rest automatically
	- Copies existing data (initial sync)
	- Streams future changes
	- Keeps tables in sync

=======================================================================================================================================

----------------------
What Gets Replicated?
----------------------

By default:
	- ✅ INSERT
	- ✅ UPDATE
	- ✅ DELETE
	- ❌ TRUNCATE (optional)

Same rules as publication.

=======================================================================================================================================

What pgAdmin Shows Under “Subscriptions”

.. code-block:: bash 

    Database
    └── Subscriptions
        └── my_sub

Clicking it shows:
	- Connection info
	- Status (active / inactive)
	- Publications linked
	- Replication slot used
	- Worker process

=======================================================================================================================================

Important Subscription Options

Initial data copy

.. code-block:: postgres 

    WITH (copy_data = true)

Disable initial copy:

.. code-block:: postgres 

    WITH (copy_data = false)

Disable temporarily

.. code-block:: postgres 

    ALTER SUBSCRIPTION my_sub DISABLE;

Enable again:

.. code-block:: postgres

    ALTER SUBSCRIPTION my_sub ENABLE;

=======================================================================================================================================

🔐 Permissions & Requirements

.. list-table::
    :header-rows: 1

    * - Requirement
      - Needed
    * - Source user
      - REPLICATION role
    * - Tables
      - Must exist on subscriber
    * - Schema
      - Must match
    * - Network
      - Direct DB connection
    * - WAL
      - Logical replication enabled

=======================================================================================================================================

⚠️ Very Important Limitations

❌ No conflict resolution

If both sides modify same row → ❌ error

❌ No DDL replication
	- Table structure changes not replicated
	- You must manually apply DDL

❌ One-way only
	- Publisher → Subscriber
	- Not bi-directional (unless complex setup)

=======================================================================================================================================

🌍 Real-World Use Cases

✅ Read replicas
	- Reporting / analytics DB

✅ Microservices
	- User service subscribes to Auth DB

✅ Multi-region sync
	- Central DB publishes
	- Regional DBs subscribe

✅ ETL pipelines
	- Operational DB → Data warehouse

=======================================================================================================================================

Real-World Analogy

Think of **YouTube:**

.. list-table::
    :header-rows: 1

    * - Concept
      - PostgreSQL
    * - Channel
      - Publication
    * - Subscriber
      - Subscription
    * - Videos
      - Data changes
    * - Notifications
      - Replication stream

You don’t get content unless you **subscribe.**

=======================================================================================================================================

How to Check Subscription Status

.. code-block:: postgres 

    SELECT * FROM pg_stat_subscription;

Check replication slots:

.. code-block:: postgres

    SELECT * FROM pg_replication_slots;

Publication + Subscription Summary

.. code-block:: bash 

    Source DB
    └── Publication
        ↓
    WAL logical stream
        ↓
    Target DB
    └── Subscription

 .. note::

    PostgreSQL subscriptions are part of logical replication and act as the receiving side of a publication. A subscription connects to a remote PostgreSQL database, fetches initial table data, and continuously applies data changes to keep the subscriber database in sync.

